import express from 'express';

import { allOrders, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/list', allOrders);
orderRouter.post('/status', updateStatus);

orderRouter.post('/place',authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);

orderRouter.post('/verifystripe',authUser, verifyStripe);

orderRouter.post('/userorders',authUser, userOrders);

export default orderRouter;