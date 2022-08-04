import { useEffect, useContext, useState } from "react";

import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContex from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContex);
    const [ highlight, setHighlight ] = useState(false);

    const NumberOfCartItems = ctx.items.reduce((currentValue, item) => currentValue + item.amount, 0);
    let btnClasses = `${classes.button} ${(highlight)? classes.bump : ""}`;
    
    useEffect(() => {
        if(ctx.items.length === 0)
            return
        
        setHighlight(true)

        const timmer = setTimeout(() => setHighlight(false), 300);
        return (() => clearTimeout(timmer));
    }, [ctx.items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span> Your Cart </span>
            <span className={classes.badge}> {NumberOfCartItems} </span>
        </button>
    );
}

export default HeaderCartButton;