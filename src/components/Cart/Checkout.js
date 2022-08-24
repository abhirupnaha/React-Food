import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim().length === 0;
const isNot5Chars = value => value.trim().length < 5;

const Checkout = (props) => {
    const [ formInputsValidity, setFormInputsValidity ] = useState({
        name: true,
        city: true,
        street: true,
        postal: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const orderHandler = (event) => {
        event.preventDefault();
        
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = !isNot5Chars(enteredPostal);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        });

        const formIsValid = (
            enteredCityIsValid &&
            enteredNameIsValid &&
            enteredPostalIsValid &&
            enteredStreetIsValid
        );


        if(!formIsValid) {
            return;
        }
    };

    const nameClasses = `${classes.control} ${
        formInputsValidity.name? '' : classes.invalid
    }`;
    const streetClasses = `${classes.control} ${
        formInputsValidity.street? '' : classes.invalid
    }`;
    const postalClasses = `${classes.control} ${
        formInputsValidity.postal? '' : classes.invalid
    }`;
    const cityClasses = `${classes.control} ${
        formInputsValidity.city? '' : classes.invalid
    }`

    return (
        <form className={classes.form} onSubmit={orderHandler}>
            <div className={nameClasses}>
                <label htmlFor='name'> Your Name </label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p style={{ color: 'red'}}> Please entered a valid name </p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor='street'> Street </label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p style={{ color: 'red'}}> Please entered a valid street </p>}
            </div>
            <div className={postalClasses}>
                <label htmlFor='postal'> Postal Code </label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formInputsValidity.postal && <p style={{ color: 'red'}}> Please entered a valid postal code </p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor='city'> City </label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p style={{ color: 'red'}}> Please entered a valid city name </p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}> Cancel </button>
                <button type='submit' className={classes.submit}> Order </button>
            </div>
        </form>
    )
};

export default Checkout;