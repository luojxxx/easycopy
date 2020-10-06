module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Users", "userName", {
        type: Sequelize.STRING(256),
        allowNull: true,
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
    ]);
  },
};
