module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ResetPasswordTokens", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
      },
      resetPasswordToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        default: Date.now,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        default: Date.now,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable("ResetPasswordTokens"),
    ]);
  },
};
