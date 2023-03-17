const { DataTypes, Sequelize } = require('sequelize')

const {COMMENT, POST, USER} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(COMMENT, {
            comment_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            content: {
                type: DataTypes.TEXT,
                allowNull: false,
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

            auth_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: USER,
                    key: "user_id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            post_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: POST,
                    key: "post_id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(COMMENT);
    },
}
