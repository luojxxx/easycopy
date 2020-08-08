const userNameLimit = 256;
const contentLimit = 10000;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable("Users", {
        userId: {
          type: Sequelize.Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          type: Sequelize.Sequelize.DataTypes.STRING(userNameLimit),
          allowNull: false,
        },
        email: {
          type: Sequelize.Sequelize.DataTypes.STRING,
        },
        password: {
          type: Sequelize.Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        emailVerifying: {
          type: Sequelize.Sequelize.DataTypes.STRING,
        },
        emailVerified: {
          type: Sequelize.Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
        },
        subscribed: {
          type: Sequelize.Sequelize.DataTypes.BOOLEAN,
          default: false,
        },
        createdAt: {
          type: Sequelize.Sequelize.DataTypes.DATE,
          default: Date.now,
        },
        updatedAt: {
          type: DataTypes.DATE,
          default: Date.now,
        },
      }),
      queryInterface.createTable("Urls", {
        urlId: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        url: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        urlRaw: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: Sequelize.DataTypes.STRING(contentLimit),
          allowNull: false,
        },
        type: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          default: Date.now,
        },
        updatedAt: {
          type: DataTypes.DATE,
          default: Date.now,
        },
        expiredAt: {
          type: Sequelize.DataTypes.DATE,
        },
        userName: {
          type: Sequelize.DataTypes.STRING(userNameLimit),
          default: "",
        },
        userId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "Users",
            key: "userId",
          },
        },
      }),
      queryInterface.createTable("EmailVerificationTokens", {
        verificationId: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "userId",
          },
        },
        verificationToken: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.Sequelize.DataTypes.DATE,
          default: Date.now,
        },
        updatedAt: {
          type: DataTypes.DATE,
          default: Date.now,
        },
      }),
      queryInterface.createTable("UserTokens", {
        userTokenId: {
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Users",
            key: "userId",
          },
        },
        userToken: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.Sequelize.DataTypes.DATE,
          default: Date.now,
        },
        updatedAt: {
          type: DataTypes.DATE,
          default: Date.now,
        },
      }),
    ]);
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
