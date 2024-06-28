import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
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

const Meals = mongoose.model('Meals', mealSchema);

export default Meals;