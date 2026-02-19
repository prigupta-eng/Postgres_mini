import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
    
);

const connect_db = async() =>{
    try{
        await sequelize.authenticate();
        console.log(`Connected to auth_db sucessfully`)
    }
    catch(err){
        console.log(`Unable to connect to database ${err}`)
    }
}

// Exporting both
export { sequelize, connect_db };