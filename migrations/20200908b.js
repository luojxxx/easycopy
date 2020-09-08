module.exports = {
  up: (queryInterface, Sequelize) => {
    const update = async () => {
      await queryInterface.createTable("UrlTypes", {
        typeName: {
          type: Sequelize.DataTypes.STRING,
          primaryKey: true,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          default: Date.now,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          default: Date.now,
        },
      })
      await queryInterface.bulkInsert("UrlTypes", [
        {
          typeName: "url",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          typeName: "text",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      await queryInterface.changeColumn("Urls", 'type',
        {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "UrlTypes",
            key: "typeName",
          },
        },
      );
    }
    return update()
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable("UrlTypes"),
      queryInterface.dropTable("UrlType"),
    ]);
  },
};
