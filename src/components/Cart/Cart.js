import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import cartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [ showCheckout, setShowCheckout ] = useState(false);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ submitted, setSubmitted ] = useState(false);
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

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        const response = await fetch('https://fir-food-270fc-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                user: userData,
                order: ctx.items
            })
        });

        if(response.ok) {
            setIsSubmitting(false);
            setSubmitted(true);
            ctx.clearItems();
        } else {
            console.log('could not placed order');
        }
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

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onCloseCart}> close </button>
            {hasItems && <button className={classes.button} onClick={checkoutHandler}> Checkout </button>}
        </div>
    );


    const cartContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span> Total Amount </span>
                <span> {totalAmount} </span>
            </div>
            {showCheckout && <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />}
            {!showCheckout && modalActions}
        </Fragment>
    );

    const submitingContent = (
        <Fragment>
            <p> Placing order ...</p>
            <button className={classes.button} onClick={props.onCloseCart}> close </button>
        </Fragment>
    );
    
    const submittedContent = (
        <Fragment>
            <p> Your order is placed </p>
            <button className={classes.button} onClick={props.onCloseCart}> close </button>
        </Fragment>
    );

    return (
        <Modal onClickBackdrop={props.onClickBackdrop}>
            {!isSubmitting && !submitted && cartContent}
            {isSubmitting && submitingContent}
            {submitted && submittedContent}
        </Modal>
    );
};

export default Cart;