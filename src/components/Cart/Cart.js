import { Fragment } from "react";
import { useContext, useState } from "react";
import Checkout from "./Checkout";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const orderButtonOnCLickHandler = () => {
    setIsClicked(true);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const SubmitHandler = (userData) => {
    setIsSubmitting(true);
    fetch("https://react-meals-6a158-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        cart: cartCtx.items,
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button
          disabled={isClicked}
          className={classes.button}
          onClick={orderButtonOnCLickHandler}
        >
          Order
        </button>
      )}
    </div>
  );
  const modalDisplay = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isClicked && (
        <Checkout onConfirm={SubmitHandler} onCancel={props.onClose} />
      )}
      {!isClicked && modalActions}
    </Fragment>
  );
  const ModalSubmitting = <p>Submitting the details...</p>;
  const ModalSubmitted = (
    <Fragment>
      <p>Your Order was placed successfully.</p>
      <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
    </Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalDisplay}
      {isSubmitting && !didSubmit && ModalSubmitting}
      {!isSubmitting && didSubmit && ModalSubmitted}
    </Modal>
  );
};

export default Cart;
