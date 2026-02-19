import {sequelize} from '../config/db.js' 
import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'

const stockDataModel = sequelize.define('stocksData',{
    ticker : {
        type:DataTypes.STRING(50),
        allowNull : false,
        primaryKey : true
    },
    name : {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    rating : {
        type: DataTypes.STRING(50),
        allowNull:false
    },
    last_price:{
        type : DataTypes.DECIMAL(15,2),
        allowNull: false
    },
    market_cap:{
        type: DataTypes.DECIMAL(15,2),
        allowNull: false
    },
    five_year_price_movement:{
        type : DataTypes.DECIMAL(15,2),
        allowNull : false
    }
},{
    // ADD THIS TO FIX THE ERROR
    tableName: 'stocks_data',
    
    // Also add this if your stocks table doesn't have createdAt/updatedAt columns
    timestamps: false 
});


export default stockDataModel;