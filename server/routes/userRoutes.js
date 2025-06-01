import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserData, storeRecentSearchCities } from '../controllers/userControllers.js';

const userRouter= express.Router();

userRouter.get('/',protect,getUserData);
userRouter.post('/stored-recent-search',protect,storeRecentSearchCities);



export default userRouter;