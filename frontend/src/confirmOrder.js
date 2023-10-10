import React from "react";
import styled from "styled-components";
import { useUserContext } from "./context/user_context";
import { useCartContext } from "./context/cart_context";
import { useShippingContext } from "./context/shipping_context";
import CheckoutSteps from "./components/checkoutstep.js"
import { useNavigate } from 'react-router-dom';
import { Button } from "./styles/Button";

const ConfirmOrder = () => {
    const navigate = useNavigate();
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { user } = useUserContext();
  const { address, date } = useShippingContext();

  
  const total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);

  return (
    <Wrapper>
         <div className="checkoutstep"><CheckoutSteps activeStep={1}/></div> 
      <h1 className="heading">Confirm Order</h1>
      <div className="order-container">
        <div className="cart-details">
          <h2>Cart Details</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cake-image">
                  <img src={item.image[0]} alt={item.name} />
                </div>
                <div className="cake-details">
                  
                  <div className="child">
                  <p><strong>Flavor:</strong> {item.flavour}</p>
                  <p><strong>Weight:</strong> {item.wt}</p>
                  </div>
                  <div className="child">
                  <p><strong>Quantity:</strong> {item.amount}</p>
                  <p><strong>Price:</strong> {item.price} Rs.</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: {total} Rs.</p>
        </div>
        <div className="user-details">
            <div className="user1">
          <h2>User Details</h2>
           <div className="user-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Address:</strong> {address}</p>
          </div>
          </div>
            <hr />
          <div className="user2">
          <h2>Delivery Details</h2>
           <div className="user-info">
            <p><strong>Delivery Date:</strong> {(date+"").slice(0,16)}</p>
            <p><strong>Delivery Time:</strong> {(date+"").slice(16,24)}</p>
          </div>
          </div>
        </div>
       
      </div>
      <div className="but">
      <Button onClick={()=>{navigate('/order')}} >Proceed to payment</Button>
      </div>
    </Wrapper>
  );
};

export default ConfirmOrder;

const Wrapper = styled.section`
   
.checkoutstep{
    width:80vw;
    margin:auto;
    margin-top:5rem;
  }

  .but{
    display: flex;
    justify-content: flex-end;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    
  }
  .heading {
    font-size: 4rem;
    font-weight: bold;
    text-align: center;
    margin:3rem 0;
    
  }

  .order-container {
    display: flex;
    justify-content: space-between;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    background-color: lightgrey;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .child{
    margin:2px 10px;
  }
  .cart-details,
  .user-details {
    flex: 1;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 10px;
  }
  .cake-details{
    display:flex;
    flex-direction:row;
    width:100%;
    justify-content:space-between;
  }
  .cart-details {
    margin-right: 20px;
  }

  .user1,user2{
    height:40%;
  }
  .cart-item {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #DDD;
    padding-bottom: 20px;
  }

  .cake-image img {
    max-width: 120px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cake-details h3 {
    margin: 0;
    
    font-size: 1.5rem;
    font-weight: bold;
    
  }

  .total-price {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 20px;
  }

  .user-details h2,
  .cart-details h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .user-info p {
    margin: 10px 0;
  }

  @media (max-width: 768px) {
   
    .order-container {
      flex-direction: column;
      align-items: center;
      max-width: 90vw;
    }

    .cart-details,.user-details {
      width: 100%;
      margin-right: 0px;
      margin-top:10px;
    }


    .cart-item {
      flex-direction: column;
    }

    .cake-image img {
      max-width: 100%;
      margin-right: 0;
    }
  }
`;
