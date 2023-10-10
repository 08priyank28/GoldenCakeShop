import React from 'react';
import styled from 'styled-components';
import Orders from './components/Orders';
import Cakes from './components/Cakes';
import Users from './components/Users';
import Delivery from './components/Delivery';
const AdminPanel = () => {

  return (
    <Wrapper>
      <div className="admin-panel">
      <div id="myGroup">
        <div className="buttons">
      <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Orders
  </button>
  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
    Cakes
  </button>
  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample2">
    Users
  </button>
  <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample4" aria-expanded="false" aria-controls="collapseExample2">
    Delivery
  </button>
  </div>

<div className="collapse" id="collapseExample" data-bs-parent="#myGroup">
      <Orders/>
</div>
<div className="collapse" id="collapseExample2" data-bs-parent="#myGroup">
   <Cakes/>
   </div>
   <div className="collapse" id="collapseExample3" data-bs-parent="#myGroup">
   <Users/>
   </div>
   <div className="collapse" id="collapseExample4" data-bs-parent="#myGroup">
   <Delivery/>
   </div>
  </div>
      </div>




    </Wrapper>
  );
};

export default AdminPanel;

const Wrapper = styled.section`


  .buttons{
    display:flex;
    justify-content:center;
  }
  .admin-panel {
    color: black;
    font-weight:bold;
    padding: 20px;
  }

  .outercard {
    border: none;
    box-shadow:2px 2px 2px 2px lightgrey;
    background-color:white;
    margin-top:2rem;
  }
  .innercard {
    border: none;
    box-shadow:2px 2px 2px 2px black;
    background-color:#ffe6ee;
  }


  .card-body {
    display: flex;
    align-items: center;
  }

  .card-image {
    flex: 0 0 40%;
    margin-right: 20px;
  }

  .card-image img {
    width: 100%;
    height: auto;
  }

  .card-details {
    flex: 1;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card-text {
    margin-bottom: 5px;
  }

  .btn {
    color: white;
    font-size:15px;
    border:none;
    margin:0.5rem 0.3rem;
  }

  .btn-primary {
    background-color: #ff187f;
  }
  .row{
    height:100vh;
    overflow-y:scroll;
  }







  
`;
