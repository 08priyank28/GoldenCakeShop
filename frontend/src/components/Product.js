import React from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { URI } from '../App';
import { toast } from "react-toastify";
import {  useUserContext } from "../context/user_context";

const Product = ({curElem,setRequestData="default"}) => {
  const {isAdmin}=useUserContext();
  const deletecake=async(id)=>{
    await axios.post(`${URI}/cakes/deletecake`,{
      id:id
    })
    .then(response => {
       setRequestData(new Date());
      toast.success("Deleted succesfully");
   })
   .catch(error => {
     toast.error(error);
   });
  }
  const { _id, name, image, price, category } = curElem;
  return (
    
      <div className="card">
        <NavLink to={`/singleproduct/${_id}`}>
        <figure>
          <img src={image[0]} alt={name} />
          <figcaption className="caption" style={{marginTop:"-1rem", backgroundColor:"#8B0000",color:"white" }}>{category}</figcaption>
        </figure>
        </NavLink>
        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{price}</p>
            {isAdmin? 
           <button className="dltbutton" onClick={()=>deletecake(_id)}><i class="material-icons" style={{fontSize:"25px"}}>delete</i></button>
            :''}
           </div>
        </div>
      </div>
    
  );
};

export default Product;