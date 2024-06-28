import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    const inputRef = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = parseInt(inputRef.current.value);

        if(enteredAmount <= 0 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={inputRef}
                input={{
                    id: "amount_" + props.id,
                    type: "number",
                    step: '1',
                    mint: '1',
                    defaultValue: '1'
                }}
            />
            <button type="submit"> + Add </button>
            {!amountIsValid && <p> Please enter valid amount (1-5). </p>}
        </form>
    );
};

export default MealItemForm;