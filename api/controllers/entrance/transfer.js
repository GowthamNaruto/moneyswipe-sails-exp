/* eslint-disable */
module.exports = {
  friendlyName: "Transfer",

  description: "Transfer the amount using the provided email.",

  extendedDescription: `This action attempts to look up the user record in the database with the specified email address.  Then, if such a user exists, transfer the given amount to the corresponding email address.`,

  inputs: {
    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: "string",
      required: true,
    },

    amount: {
      description: "The transferable value e.g $50.",
      type: "number",
      required: true,
    },

    message: {
      description: "request message",
      extendedDescription: `Note that this is NOT SUPPORTED when using virtual requests (e.g. sending
      requests over WebSockets instead of HTTP).`,
      type: "string",
    },
  },

  exits: {
    success: {
      description:
        "Amount has been successfully transferred to the      provided email address",
      extendedDescription: `Under the covers, this stores the trasnfer log between the users in the database `,
    },
    badCombo: {
      description: `The provided email does not match any user in the database.`,
      responseType: "noUser",
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },
    invalidAmount: {
      description: "The provided amount is invalid.",
    },
    invalidEmailAddress: {
      description: "No user receipient found for the provided email address",
    },
    insufficientFunds: {
      description: "You dont have enough funds to transfer",
    },
    ownAccount: {
      description: "You cant send money to yourself",
    },
  },

  fn: async function ({ emailAddress, amount, message }) {
    if (!amount || amount <= 0) {
      throw "invalidAmount";
    }
    // Find recipient user email Id on the database
    var userRecord = await User.findOne({ emailAddress: emailAddress });

    // If no such user exists, or their token is expired, bail.
    if (!userRecord || this.req.me.emailAddress === userRecord.emailAddress) {
      throw "ownAccount";
    }

    // If the transfer amount is greater than the existing balance amount
    if (amount > this.req.me.movements) {
      throw "insufficientFunds";
    }

    // Update the receiver balance amount
    var value = userRecord.movements + amount;

    await User.updateOne({ id: userRecord.id }).set({
      movements: value,
    });

    // Update the sender's balance amount
    var balance = this.req.me.movements - amount;

    await User.updateOne({ id: this.req.me.id }).set({
      movements: balance,
    });

    // Generate unique transaction ID

    class transcation {
      constructor() {
        this.length = 12;
        this.timestamp = +new Date();

        var _getRandomInt = function (min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.generate = function () {
          var ts = this.timestamp.toString();
          var parts = ts.split("").reverse();
          var id = "";

          for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
          }

          return id;
        };
      }
    }

    // var generator = new IDGenerator();
    var generator = new transcation();
    var finalId = generator.generate();
    // console.log(transcation);

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    var newTransferLog = await Transfer.create(
      _.extend(
        {
          fromEmailAddress: this.req.me.emailAddress,
          toEmailAddress: emailAddress,
          transactionId: finalId,
          amount,
          message,
        },
        sails.config.custom.verifyEmailAddresses
          ? {
              isPaymentSuccess: true,
            }
          : {}
      )
    );
    // console.log(newTransferLog);
  },
};
/* eslint-disable */
