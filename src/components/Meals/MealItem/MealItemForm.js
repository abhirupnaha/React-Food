import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
    return (
        <form className={classes.form}>
            <Input label="Amount" input={{
                id: "amount_" + props.id,
                type: "number",
                step: '1',
                mint: '1',
                defaultValue: '1'
            }}/>
            <button> + Add </button>
        </form>
    );
};

export default MealItemForm;