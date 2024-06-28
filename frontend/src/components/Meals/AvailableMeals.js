import { useEffect, useState } from 'react';

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [ meals, setMeals ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ httpError, setHttpError ] = useState(null);

    useEffect(() => {
        const fetchMeal = async () => {
            // const response = await fetch('https://fir-food-270fc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
            const response = await fetch('/meals');
            if(!response.ok)
                throw new Error('something went wrong');

            const responseData = await response.json();
            const loadedMeal = [];
            console.log(responseData);
            // for (const key in responseData) {
            //     loadedMeal.push({
            //         id: key,
            //         // id: responseData[key]._id,
            //         name: responseData[key].name,
            //         description: responseData[key].description,
            //         price: responseData[key].price
            //     })
            // }
            for (const meal of responseData) {
                loadedMeal.push({
                    id: meal._id,
                    description: meal.description,
                    name: meal.name,
                    price: Number(meal.price)
                });
            }
            console.log(loadedMeal);
            setMeals(loadedMeal);
            setIsLoading(false);
        };

        fetchMeal().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p> Loading ... </p>
            </section>
        );
    }
    
    if(httpError) {
        return (
            <section className={classes.MealsError}>
                <p> {httpError} </p>
            </section>
        );
    }

    const mealsList = meals.map((meal) =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;