import styled from "styled-components";
import { useUserContext } from "./context/user_context";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URI } from "./App";

function YourOrder() {
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated } = useUserContext();

  useEffect(() => {
    axios.post(`${URI}/orders/viewOrders`, { email: user?.email })
      .then((response) => {
        // Sort orders by created_at date in descending order
        const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [user]);

  const cancelOrder=(orderId)=>{
    console.log(orderId, " ",user.email)
    axios.post(`${URI}/orders/cancelOrders`, { email: user?.email, orderId })
    .then((response) => {
      // Sort orders by created_at date in descending order
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Error in Canceling orders:', error);
    });
  }
  // Helper function to format the date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Wrapper>
      <h1>View Orders</h1>
      <OrdersList>
      {orders.map((order, orderIndex) => (
        <OrderItem key={orderIndex}>
          <h2>Order {orderIndex + 1}</h2>
          <OrderTime className="bold">Placed at: {formatDate(order.created_at)} <br />Order id:{order.id} <br /><button className="bt" onClick={()=>cancelOrder(order.id)}>Cancel Order</button></OrderTime>

          
          
          {order.order.map((item, itemIndex) => (
            <Item key={itemIndex}>
              <a href={`http://localhost:3000/singleproduct/${item.cakeid}`}>
                <ItemImage src={item.image[0]} alt="Cake" />
                {item.isConfirmed=="  completed"?
                <OrderStatus>Prepared</OrderStatus>
                :<OrderStatus>{item.isConfirmed}</OrderStatus>}
              </a>
              <ItemDetails>
                <h3 className="bold">Item {itemIndex + 1}</h3>
                <div className="parent">
                  <div>
                    <p>Name: {item.name}</p>
                    <p>Flavour: {item.flavour}</p>
                    <p>Weight: {item.wt}</p>
                  </div>
                  <div>
                    <p>Quantity: {item.amount}</p>
                    <p>Name on Cake: {item.bname}</p>
                    <p>Price: {item.price}</p>
                  </div>
                </div>
              </ItemDetails>
            </Item>
          ))}
        </OrderItem>
      ))}
      </OrdersList>
    </Wrapper>
  );
}



// ... Styled components and other code remains the same ...


export default YourOrder;

const Wrapper = styled.div`
  background-color: #ff187f;
  padding: 20px;
  text-align: center;
  .bt{
    background-color:red;
    color:white;
    width:50%;

  }
  h1 {
    color: white;
    margin-bottom: 20px;
    font-size: 24px; /* Increase font size for the heading */
  }
  .bold {
    font-weight: bold; /* Make text bold */
    font-size: 22px; /* Increase font size for other text */
  }
  .parent{
   display:flex;
   justify-content:space-around;
   flex-wrap:wrap;
  }
  p{
    font-size:20px;
  }
  
`;

const OrdersList = styled.ul`
  list-style: none;
  padding: 0;
  height:100vh;
  overflow-y: scroll;
`;

const OrderItem = styled.li`
  background-color: #f0f0f0; /* Background color behind each order */
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column; /* Display items vertically */
  gap: 20px;
`;

const OrderTime = styled.p`
  align-self: flex-end; /* Position time on the right side */
  margin-top: -10px; /* Adjust the margin as needed */
`;

const OrderStatus = styled.p`
  align-self: flex-end; /* Position time on the right side */
 
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap; /* Wrap items to a new line on smaller screens */
  gap: 20px;
  background-color: white; /* Background color behind each item */
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  box-shadow:2px 2px 2px grey;
`;

const ItemImage = styled.img`
  width: 200px; /* Image width */
  height: auto;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-basis: calc(50% - 10px); /* Two columns with a gap on larger screens */
  @media (max-width: 768px) {
    flex-basis: 100%; /* Full width on smaller screens */
  }
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
`;
