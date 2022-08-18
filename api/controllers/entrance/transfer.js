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
  },

  fn: async function () {
    // Respond with view.
    return {};
  },
};
/* eslint-disable */
