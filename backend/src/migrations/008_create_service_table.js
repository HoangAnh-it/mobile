const {DataTypes } = require('sequelize')

const {SERVICE, HOSPITAL} = require("./table_name")

module.exports =  {
    up: async (queryInterface) => {
        await queryInterface.createTable(SERVICE, {
            service_id: {
                type: DataTypes.UUID,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            price: {
                type: DataTypes.DOUBLE,
                defaultValue: 0
            },

            description: {
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

            hospital_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: HOSPITAL,
                    key: "hospital_id"
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(SERVICE);
    },
}
