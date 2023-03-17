const { DataTypes, Sequelize } = require('sequelize')

const {NOTIFICATION ,USER} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(NOTIFICATION, {
            notification_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            content: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            link: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },

            isRead: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },

            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: USER,
                    key: "user_id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(NOTIFICATION);
    },
}
