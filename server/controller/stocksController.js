import { sequelize } from "../config/db.js";
import { QueryTypes } from "sequelize";
import WatchListItem from "../models/watchListItems.js";
import Watchlist from "../models/watchListModel.js";
import stockDataModel from "../models/stocksModel.js";
import jwt from 'jsonwebtoken'
import { config } from "dotenv"
config()


export const getMultipleStocks = async (req, res) => {
    try {
        const userInput = req.query.q;

        if (!userInput) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const query = `
            SELECT ticker, name, rating, last_price
            FROM stocks_data
            WHERE ticker ILIKE :search OR name ILIKE :search
            ORDER BY ticker ASC
            LIMIT 10;
        `;

        const result = await sequelize.query(query, {
            replacements: { search: `${userInput}%` },
            type: QueryTypes.SELECT
        });

        res.json(result);

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: `Internal server error` });
    }
};

export const getAllWatchlists = async(req, res) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({error : "Not authenticated"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId  = decoded.id;
        const watchlists = await Watchlist.findAll({
            where: { user_id: userId },
            attributes: ['id', 'name'], // Get list ID and Name
            include: [
                {
                    model: WatchListItem,
                    attributes: ['id', 'ticker'], // Also get the tickers inside this list
                    include : [
                        {
                            model : stockDataModel,
                            as : 'stockDetails',
                            attributes : ['ticker','name', 'last_price', 'rating']
                        }

                    ]
                }
            ],
            order: [['id', 'ASC']]   // Sort by oldest list first
        });

        res.json(watchlists);

    }
    catch(error){
        res.status(500).json({error : `Internal server error ${error}`})
    }
}



export const createWatchList = async (req, res) =>{
    try{
        const  {name, stocks} = req.body;

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        if(!name ){
            return res.status(400).json({error : `Listname is required`});;
        }
        const existingList = await Watchlist.findOne({where : {user_id : userId, name : name}});
        if(existingList){
            return res.status(400).json({error : `You already have a list named ${name}. Please choose a different name.`})
        }
        const newList = await Watchlist.create({
            user_id : userId,
            name : name,
        });
        
        
        //prepare the items for next table
        if(stocks && stocks.length > 0){
            const listItems = stocks.map((stock) => ({
                watchlist_id : newList.id,
                ticker : stock.ticker
            }));;
            await WatchListItem.bulkCreate(listItems);
        }

        return res.status(201).json({message:"List created sucessfully", list : newList});
        
    }
    catch(error){
        res.status(500).json({error : `Internal  server error  ${error}`})
    }
}