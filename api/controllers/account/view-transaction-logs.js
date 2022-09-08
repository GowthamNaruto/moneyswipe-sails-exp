module.exports = {
  friendlyName: "View Transaction logs",

  description: 'Display "Transaction logs" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/account/transaction-logs",
    },
  },

  fn: async function () {
    return {};
  },
};
