import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";

const CartItem = ({ id, image, flavour,wt, price, amount,bname,customize }) => {
 
 const { removeItem, setDecrease, setIncrement } = useCartContext();
 console.log(image)
  return (
    <div className={customize?"carthead grid grid-five-column customize":"carthead grid grid-five-column"}>
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image[0]} alt={id} />
          </figure>
        </div>
        <div style={{height:"60px",overflowY: "auto",boxShadow:"2px 2px 2px 2px lightgrey",color:"white"}}>
          <div className="flavour-div">
            <p className="tt"><b>flavour:</b>  {flavour}</p>  
          </div>
          <hr />
          <div className="flavour-div">
            <p className="tt"><b>Weight:</b>  {wt}</p>  
          </div>
          <hr />
          <div className="flavour-div">
            <p className="tt"><b>Name on Cake:</b>  {bname}</p>  
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p className="tt">
        {!customize?
          <FormatPrice price={price} />
          :
          "Cash On delivery"
          }
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrement(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          {!customize?
          <FormatPrice price={price * amount} />
          :
          "Cash On delivery"
          }
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;