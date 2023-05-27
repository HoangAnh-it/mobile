const { DataTypes, Sequelize } = require('sequelize')

const { MEDICAL_RESULT, APPOINTMENT } = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(MEDICAL_RESULT, {
            medicalResultId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            disease: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },

            medicines: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            note: {
                type: DataTypes.TEXT,
                allowNull: true,
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

            appointmentId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: APPOINTMENT,
                    key: "appointmentId"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(MEDICAL_RESULT);
    },
}
