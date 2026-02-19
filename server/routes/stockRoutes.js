import { Router } from "express";
import { getMultipleStocks, createWatchList, getAllWatchlists } from "../controller/stocksController.js";
import { isAuth } from "../middleware/auth.js";
const stockRouter = Router();

stockRouter.get('/search', getMultipleStocks)
stockRouter.get('/watchlist/my',isAuth, getAllWatchlists)
stockRouter.post('/watchlist/create', isAuth, createWatchList)

export default stockRouter;