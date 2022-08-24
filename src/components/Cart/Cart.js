import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [ showCheckout, setShowCheckout ] = useState(false);
    const ctx = useContext(cartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const itemRemoveHandler = (id) => {
        ctx.removeItem(id);
    };

    const itemAddHandler = (item) => {
        ctx.addItem({...item, amount: 1});
    };

    const checkoutHandler = () => setShowCheckout(true);

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

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}> close </button>
            {hasItems && <button className={classes.button} onClick={checkoutHandler}> Checkout </button>}
        </div>
    );

    return (
        <Modal onClickBackdrop={props.onClickBackdrop}>
            {cartItems}
            <div className={classes.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>
            {showCheckout && <Checkout onCancel={props.onCloseCart}/>}
            {!showCheckout && modalActions}
        </Modal>
    );
};

export default Cart;