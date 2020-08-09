const userNameLimit = 256;
const contentLimit = 10000;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RecaptchaTokens", {
      recaptchaTokenId: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      recaptchaToken: {
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
      queryInterface.dropTable("Users"),
      queryInterface.dropTable("Urls"),
      queryInterface.dropTable("EmailVerificationTokens"),
      queryInterface.dropTable("UserTokens"),
    ])
  },
};
