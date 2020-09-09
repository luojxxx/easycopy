module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "emailVerified"),
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "emailVerified", {
        type: Sequelize.DataTypes.BOOLEAN,
      }),
    ]);
  },
};
