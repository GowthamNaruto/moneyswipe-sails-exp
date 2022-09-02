/**
 * Transfer.js
 *
 * A user can transfer money to another user when logged in.
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    fromEmailAddress: {
      type: "string",
      required: true,
      isEmail: true,
      maxLength: 200,
      example: "mary.sue@example.com",
    },
    toEmailAddress: {
      type: "string",
      required: true,
      isEmail: true,
      maxLength: 200,
      example: "mary.sue@example.com",
    },

    // paymentStatus: {
    //   type: "string",
    //   isIn: ["confirmed", "un-confirmed"],
    //   defaultsTo: "confirmed",
    //   description: "The confirmation status of the payment.",
    // },
    message: {
      type: "string",
      defaultsTo: "Null",
      description: "Message that was given to the payment",
    },

    amount: {
      type: "number",
      required: true,
      description: "Transfered amount",
      example: 1500,
    },

    isPaymentSuccess: {
      type: "boolean",
      description:
        "Whether the payment is false it may be due to the api issue, networl issue or may be due to insufficient funds ",
    },

    transactionId: {
      type: "number",
      description: "The id of the transaction associated with this user",
      example: 111111111111,
    },
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a
  },
  // datastore: "mongodb",
};
