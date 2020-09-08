module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addIndex("Urls", {
        fields: ["urlRaw"],
        name: "Urls_urlRaw",
      }),
      queryInterface.addIndex("Urls", {
        fields: ["userId"],
        name: "Urls_userId",
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeIndex("Urls", "Urls_urlRaw"),
      queryInterface.removeIndex("Urls", "Urls_userId"),
    ]);
  },
};
