
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URI } from '../App';
import { toast } from 'react-toastify';
import styled from "styled-components";
import { Navigate, useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    axios.get(`${URI}/orders/adminOrders`)
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

  const confirm = async (data, item, order, time) => {
    let msg = "";
    if (data === 1)
      msg = prompt("What is Price for this cake?");
    if (data === 2)
      msg = prompt("What is Problem with this cake?");

    await axios.post(`${URI}/orders/confirmOrder`, {
      data: data,
      suborder: item,
      order: order,
      time: time,
      msg: msg,
    })
      .then(response => {
        setRequestData(new Date());
        toast.success(response.data);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const getCount = (order) => {
    var count = 0;
    order.map((o) => {
      if (o.isConfirmed == "processing")
        count++;
    })
    return count;
  }

  const getInvoice = async () => {
    try {
      const response = await axios.get(`${URI}/orders/generatepdf`, {
        responseType: 'arraybuffer', // Specify the response type as 'arraybuffer'
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create an <a> element and set its attributes for downloading
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'invoice.pdf';

      // Trigger a click event on the <a> element to start the download
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching or handling PDF:', error);
    }
  };
  var cnt = 0
  return (
    <>
      <Wrapper>
        <h1>View Orders</h1>
        <button className="btn btn-success" onClick={getInvoice}>Generate Invoice</button>
        <button className="btn btn-success" onClick={() => navigate('/cancelOrders')}>Cancel Orders</button>
        <OrdersList>
          {orders.map((o, orderIndex) => (
            <>
              {o.status !== "cancelled" ?
                <OrderItem key={orderIndex}>

                  {getCount(o.order) >= 1 &&
                    <>
                      <h2>Order {++cnt}</h2>
                      <OrderTime className="bold">Placed at: {formatDate(o.created_at)} <br />
                      Order id:{o._id}</OrderTime>
                    </>
                  }

                  {o.order.map((item, itemIndex) => (
                    <>
                      {item.isConfirmed === "processing" ? <>
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
                                <p>Name on Cake: {item.bname}</p>
                                <p>Price: {item.price}</p>
                              </div>
                              <div>
                                <p>User : {o.user.name}</p>
                                <p>Mobile No : {o.user.mobileno}</p>
                                <p>Delivery Time : {o.time}</p>
                              </div>
                              <div>
                                {item.customize ?
                                  <>
                                    <button className="btn btn-success" onClick={() => confirm(1, item, o, o.time)}>Accept</button>
                                    <button className="btn btn-danger" onClick={() => confirm(2, item, o, o.time)}>Reject</button>
                                  </>
                                  :
                                  <button className="btn btn-success btn-lg" onClick={() => confirm("", item, o, "")} >Confirm</button>
                                }
                              </div>
                            </div>
                          </ItemDetails>
                        </Item>
                      </> : ""}
                    </>
                  ))}
                </OrderItem>
                : ""}
            </>

          ))}
        </OrdersList>
      </Wrapper>
    </>
  );
}
export default Orders;

const Wrapper = styled.div`
  ${'' /* background-color: #ff187f; */}
  padding: 20px;
  text-align: center;
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


