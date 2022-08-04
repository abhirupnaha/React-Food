import { useContext } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const ctx = useContext(cartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const itemRemoveHandler = (id) => {
        ctx.removeItem(id);
    };

    const itemAddHandler = (item) => {
        ctx.addItem({...item, amount: 1});
    };

    const cartItems = <ul className={classes["cart-items"]}> {
        ctx.items.map((item) => (
            <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={itemRemoveHandler.bind(null, item.id)}
                onAdd={itemAddHandler.bind(null, item)}
            />
        ))} </ul>;

    return (
        <Modal onClickBackdrop={props.onClickBackdrop}>
            {cartItems}
            <div className={classes.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onCloseCart}> close </button>
                {hasItems && <button className={classes.button}> Order </button>}
            </div>
        </Modal>
    );
};

export default Cart;