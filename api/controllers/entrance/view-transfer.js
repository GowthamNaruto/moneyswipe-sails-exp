module.exports = {
  friendlyName: "View contact",

  description: 'Display "Transfer" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/entrance/transfer",
    },
  },

  fn: async function () {
    // Respond with view.
    return {};
  },
};
