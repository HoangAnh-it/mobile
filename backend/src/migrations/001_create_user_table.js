const { DataTypes, Sequelize } = require('sequelize')

const {USER, DEPARTMENT} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(USER, {
            userId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true
            },

            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },

            birthDay: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            avatar: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            phone: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },

            role: {
                type: DataTypes.ENUM("PATIENT", "DOCTOR", "HOSPITAL"),
                allowNull: false,
                defaultValue: "PATIENT"
            },

            address: {
                type: DataTypes.STRING,
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
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(USER);
    },
}
