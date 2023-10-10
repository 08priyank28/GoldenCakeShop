
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URI } from './App';
import { toast } from 'react-toastify';
import styled from "styled-components";
import { Navigate, useNavigate } from 'react-router-dom';

const CancelOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [requestData, setRequestData] = useState(new Date());

    useEffect(() => {
        axios.get(`${URI}/orders/cancelOrders`)
            .then((response) => {
                // Sort orders by created_at date in descending order
                const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setOrders(sortedOrders);
                console.log(orders);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, [requestData]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };


    const getCount = (order) => {
        var count = 0;
        order.map((o) => {
            if (o.isConfirmed == "processing")
                count++;
        })
        return count;
    }


    var cnt = 0
    return (
        <>
            <Wrapper>
                <h2>Cancel Orders</h2>
                <OrdersList>
                    {orders.map((o, orderIndex) => (
                        <OrderItem key={orderIndex}>
                            <>
                                <h2>Order {++cnt}</h2>
                                <OrderTime className="bold">Placed at: {formatDate(o.created_at)} <br />Order Id: {o._id}</OrderTime>

                            </>

                            {o.order.map((item, itemIndex) => (
                                <>
                                    <>
                                        <Item key={itemIndex}>
                                            <a href={"http://localhost:3000/singleproduct/" + item.cakeid}>
                                                <ItemImage src={item.image[0]} alt="Cake" />
                                                {/* {item.isConfirmed=="completed"? */}
                                                {/* <OrderStatus>Prepared</OrderStatus> */}
                                                {/* :<OrderStatus>{item.isConfirmed}</OrderStatus>} */}
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
                                                        <p>Cake Prepared?: {item.isConfirmed == "processing" ? "NO" : "YES"}</p>
                                                        <p>Price: {item.price}</p>
                                                    </div>
                                                    <div>
                                                        <p>User : {o.user.name}</p>
                                                        <p>Mobile No : {o.user.mobileno}</p>
                                                        <p>Delivery Time : {o.time}</p>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                            </ItemDetails>
                                        </Item>
                                    </>
                                </>
                            ))}
                        </OrderItem>
                    ))}
                </OrdersList>
            </Wrapper>
        </>
    );
}
export default CancelOrders;

const Wrapper = styled.div`
${'' /* background-color: #ff187f; */}
padding: 20px;
text-align: center;
h1 {
color: white;
margin-bottom: 20px;
font-size: 24px; /* Increase font size for the heading */
}
h2{
    font-weight:bold;

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


