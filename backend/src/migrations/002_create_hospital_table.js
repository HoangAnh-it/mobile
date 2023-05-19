const { DataTypes, Sequelize } = require('sequelize')

const {HOSPITAL, USER} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(HOSPITAL, {
            hospitalId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },

            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: USER,
                    key: "userId"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(HOSPITAL);
    },
}