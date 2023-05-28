import { Sequelize } from "sequelize-typescript";
import { DATA_SOURCE } from './vars.config'
import * as models from '../models'

const { mysql } = DATA_SOURCE

const db = new Sequelize({
    dialect: "mysql",
    host: mysql.DB_HOST,
    username: mysql.DB_USER,
    password: mysql.DB_PASSWORD,
    database: mysql.DB_DATABASE,
    logging: false,
    timezone: "+07:00"
});

export function connectToDatabase() { 
    db.addModels(Object.keys(models).map(modelName => models[modelName as keyof typeof models]))
    db.sync()
        .then(() => {
            console.log("Connect to database successfully.")
        }).catch(err => { 
            console.log("Fail when trying to connect to database.")
            console.error(err)
        })
};
