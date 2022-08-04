import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            // const updateItem = state.items.concat(action.item);
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
            const pos = state.items.findIndex(item => item.id === action.item.id);

            if(state.items[pos]) {
                const updateItem = {...state.items[pos], amount: state.items[pos].amount + action.item.amount};
                const updateList = [...state.items];
                updateList[pos] = updateItem;
                return { items: updateList, totalAmount: updatedTotalAmount };
            }
            else {
                return {
                    items: [ ...state.items, action.item],
                    totalAmount: updatedTotalAmount
                };
            }
        
        case "REMOVE":
            const pos2 = state.items.findIndex(item => item.id === action.id);
            const updatedTotalAmount2 = state.totalAmount - state.items[pos2].price;

            if(state.items[pos2].amount === 1) {
                // const newList = new Array(state.items.filter( item => item.id !== action.id)) // does not work?
                const newList = state.items.filter( item => item.id !== action.id); // works
                return { items: newList, totalAmount: updatedTotalAmount2 };
            }
            else {
                const updatedItem = state.items[pos2].amount - 1;
                const updatedList = [...state.items];
                updatedList[pos2].amount = updatedItem;
                return { items: updatedList, totalAmount: updatedTotalAmount2 };
            }

        default:
            return defaultCartState;
    }
}

const CartProvider = (props) => {
    const [ cartState, dispatchCartAction ] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        dispatchCartAction({type: "ADD", item: item});
    };

    const removeItemHandler = (id) => {
        dispatchCartAction({type: "REMOVE", id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return (
        <CartContext.Provider value={{...cartContext}}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;