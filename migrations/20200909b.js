module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Users", "subscribed"),
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Users", "subscribed", {
        type: Sequelize.DataTypes.BOOLEAN,
      }),
    ]);
  },
};
