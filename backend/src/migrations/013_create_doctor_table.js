const { DataTypes, Sequelize } = require('sequelize')

const {USER, DEPARTMENT, HOSPITAL, DOCTOR} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(DOCTOR, {
            doctorId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            rank: {
                type: DataTypes.STRING(100),
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
        await queryInterface.dropTable(DOCTOR);
    },
}
