import mongoose from 'mongoose';
import Meals from './meals.js';

const orderItemSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Meals
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const userSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    postal: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    order: {
        type: [orderItemSchema],
        required: true
    },
    user: {
        type: userSchema,
        required: true
    }
});

const Orders = mongoose.model('Orders', orderSchema);

export default Orders;