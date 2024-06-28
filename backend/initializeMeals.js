import Meals from "./models/meals.js";

const defaultMeals = [
    {
      "description": "Finest fish and veggies",
      "name": "Sushi",
      "price": 22.99
    },
    {
      "description": "South Indian breakfast",
      "name": "Dosa",
      "price": 16.5
    },
    {
      "description": "American, juicy, meaty",
      "name": "Chicken Burger",
      "price": 12.99
    },
    {
      "description": "Healthy...and green...",
      "name": "Green Bowl",
      "price": 18.99
    }
];

export default async function initializeMeal() {
    try {
        const meals = await Meals.insertMany(defaultMeals);
        console.log(meals);
    } catch (err) {
        console.log('error while intializing meals')
        console.log(err);
    }
}