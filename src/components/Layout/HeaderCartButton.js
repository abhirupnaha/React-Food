import { useContext } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContex from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContex);

    const NumberOfCartItems = ctx.items.reduce((currentValue, item) => currentValue + item.amount, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span> Your Cart </span>
            <span className={classes.badge}> {NumberOfCartItems} </span>
        </button>
    );
}

export default HeaderCartButton;