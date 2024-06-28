import express from 'express';

import logger from './middleware/logger.js';
import validateOrder from './middleware/validateOrder.js';

import Meals from './models/meals.js';
import Orders from './models/orders.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(logger);

app.get('/meals', async (req, res) => {
    let meals = [];
    try {
        meals = await Meals.find({});
        console.log('fetched meals\n', meals);
    } catch (err) {
        console.log('error while fetching meals');
        console.log(err);
        res.sendStatus(500);
        return;
    }
    res
        .status(200)
        .json(meals);
});

app.post('/orders', validateOrder, async (req, res) => {
    try {
        if (req.bodyError) {
            res
                .sendStatus(400)
            return;
        }

        const newOrder = req.body
        const order = await Orders.create(newOrder);
        console.log('new order added\n', order);
    } catch (err) {
        console.log('error while adding order');
        console.log(err);
        res
            .status(500)
            .json({ message: 'error occured while adding new order'}); 
        return;  
    }
    res.sendStatus(200);
});

export default app;