import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';
import initializeMeal from './initializeMeals.js';

dotenv.config();

const url = process.env.MONGOD_URL

async function start() {
    try {
        await mongoose.connect(url);
        console.log('connected to mongodb server');
    } catch (err) {
        console.log(err);
    }

    const conn = mongoose.connection;
    conn.on('connected', () => console.log('mongodb connected'));
    conn.on('disconnected', () => console.log('mongodb disconnected'));

    app.listen(2000, () => {
        console.log('server running at port 2000');
    })
}

start();
// initializeMeal();