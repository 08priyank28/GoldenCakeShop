import React, { useState,useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { URI } from '../App';


const Users = () => {
    const [users,setUsers]=useState([]);
    
    useEffect(()=>{

        const getAllUsers=async(req,res)=>{
            await axios.get(`${URI}/users/allusers`,{ withCredentials: true })
            .then(response => {
             setUsers(response.data);
           })
           .catch(error => {
             console.error('Error fetching data:', error);
           });
        }
         getAllUsers();
         
   },[])

 
      return (
        <Wrapper>
            <p style={{marginTop:"10px"}}>Total No of Users: {users.length}</p>
    <div className="table-responsive text-center mt-5">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Details</th>
            <th>Birthdate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.email} <br />{user.mobileno}</td>
              <td>{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Wrapper>
  );
};
    

export default Users


const Wrapper = styled.section`

.table-responsive{
    width:80%;
    margin:auto;
}
td{
  font-weight:normal;
}

.table{
    font-size:17px;
    box-shadow:5px 5px 5px 5px lightgrey;
   
}
@media only screen and (max-width: 600px) {
    .table-responsive{
        width:100%;

    }
   .table
   {
    font-size:12px;
   }
  }
`;