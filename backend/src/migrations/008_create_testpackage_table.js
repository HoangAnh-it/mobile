const {DataTypes,Sequelize } = require('sequelize')

const {TEST_PACKAGE, DEPARTMENT} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(TEST_PACKAGE, {
            testPackageId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            price: {
                type: DataTypes.STRING,
                defaultValue: "0đ"
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },

            departmentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: DEPARTMENT,
                    key: "departmentId"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(TEST_PACKAGE);
    },
}
