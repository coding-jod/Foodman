import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;
const Checkout = (props) => {
  const [formValidity, setFormValdidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    console.log(enteredName);
    console.log(enteredStreet);
    console.log(enteredPostal);
    console.log(enteredCity);
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isNotFiveChars(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    setFormValdidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };
  const nameClassName = `${classes.control}   ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetClassName = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalClassName = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityClassName = `${classes.control}   ${
    formValidity.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassName}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={streetClassName}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={postalClassName}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
      </div>
      <div className={cityClassName}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
