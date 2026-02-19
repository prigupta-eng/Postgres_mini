import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import Sequelize from "sequelize";
const UserModel = sequelize.define('User', {
   
    name: {
        type: DataTypes.STRING(100), 
        allowNull: true,             
    },
    email: {
        type: DataTypes.STRING(100), 
        allowNull: true,             
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,        
        allowNull: false,
    },
    role: {
        type: DataTypes.TEXT,        
    },
    createdat: {
         type: DataTypes.DATE,
         defaultValue: Sequelize.NOW,
         field: 'createdat' 
    }
}, {
    tableName: 'users',      
    timestamps: false,       
});

export default UserModel