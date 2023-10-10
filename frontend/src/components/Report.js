import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { URI } from '../App';
import styled from 'styled-components';

const Report = () => {
    const [orders, setOrders] = useState();
    const [requestData, setRequestData] = useState(new Date());

    useEffect(() => {
        axios.get(`${URI}/orders/allOrders`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, [requestData]);



    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);


    const filteredOrders = orders.filter(order => {
        const orderMonth = new Date(order.time).getMonth() + 1;
        return orderMonth === selectedMonth;
    });

    const totalSales = filteredOrders.reduce((acc, order) => acc + order.amount, 0);

    const handleMonthChange = event => {
        setSelectedMonth(parseInt(event.target.value, 10));
    };

    return (
        <Wrapper>
            <div>
                <h2>Monthly Report</h2>
                <label>Sele t Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value={1}>January</option>
                    <option value={2}>February</option>
                    <option value={3}>March</option>
                    <option value={4}>April</option>
                    <option value={5}>May</option>
                    <option value={6}>June</option>
                    <option value={7}>July</option>
                    <option value={8}>August</option>
                    <option value={9}>September</option>
                    <option value={10}>October</option>
                    <option value={11}>November</option>
                    <option value={12}>December</option>
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.time}</td>
                                <td>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Total Sales: {totalSales}</h3>
            </div>
        </Wrapper>
    );
};

export default Report;


const Wrapper = styled.div`
  /* CSS for the MonthlyReport component table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

`;