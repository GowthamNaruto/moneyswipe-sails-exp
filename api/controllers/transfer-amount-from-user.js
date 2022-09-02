module.exports = {
  friendlyName: "Transfer the amount and update movement",

  description:
    "Make a transfer by entering an amount and receipient email address" +
    "updating the current users movement.",

  inputs: {
    emailAddress: {
      type: "string",
    },

    amount: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "Amount has been transfered successfully",
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

  fn: async function ({ emailAddress, amount }) {
    if (!amount || amount <= 0) {
      throw "invalidAmount";
    }

    // Look up the user with this reset token.
    var userRecord = await User.findOne({ emailAddress: emailAddress });

    // var userAmount = userRecord.movements

    // If no such user exists, or their token is expired, bail.
    if (!userRecord || this.req.me.emailAddress === userRecord.emailAddress) {
      throw "ownAccount";
    }
    if (amount > this.req.me.movements) {
      throw "insufficientFunds";
    }

    // Update current date
    // const labelDate = document.querySelector(".date");

    // const now = new Date();
    // const option = {
    //   hour: "numeric",
    //   minute: "numeric",
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    //   weekday: "long",
    // };
    // labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now);
    //Uptade the movement

    // Store the user's new password and clear their reset token so it can't be used again.
    var value = userRecord.movements + amount;

    await User.updateOne({ id: userRecord.id }).set({
      movements: value,
    });

    var balance = this.req.me.movements - amount;

    await User.updateOne({ id: this.req.me.id }).set({
      movements: balance,
    });

    // Log the user in.
    // (This will be persisted when the response is sent.)
    // this.req.session.userId = userRecord.id;

    // In case there was an existing session, broadcast a message that we can
    // display in other open tabs.
    // if (sails.hooks.sockets) {
    //   await sails.helpers.broadcastSessionChange(this.req);
    // }
  },
};
