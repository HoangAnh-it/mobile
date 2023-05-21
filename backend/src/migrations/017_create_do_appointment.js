const { DataTypes, Sequelize } = require('sequelize')

const {APPOINTMENT, USER,DO_APPOINTMENT} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(DO_APPOINTMENT, {
            doAppointmentId: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            userId: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue: null,
                references: {
                    model: USER,
                    key: "userId",
                    
                },
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
            },

            appointmentId: {
                type: DataTypes.UUID,
                allowNull: true,
                defaultValue: null,
                references: {
                    model: APPOINTMENT,
                    key: "appointmentId"
                },
                onUpdate: "SET NULL",
                onDelete: "SET NULL",
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
        await queryInterface.dropTable(DO_APPOINTMENT);
    },
}
