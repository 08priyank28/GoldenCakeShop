import {React,useState} from 'react';
import styled from "styled-components";

import axios from 'axios';
import {URI} from './App';
import { useCartContext } from "./context/cart_context";
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';
const CustomizeCake = () => {
  const { addToCart } = useCartContext();
  const [design,setDesign]=useState([]);
  const [flavour,setFlavour]=useState("");
  const [wt,setWeight]=useState();
  const [detail,setDetail]=useState("");
  const [bname,setBname]=useState("");
  let amount = 1;

  const handleImageUpload = async(event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${URI}/cakes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        const filename = response.data.downloadURL;
        console.log(filename)
        console.log("hello",'ABC')
        //retrive image from firebase
        //  setDesign("https://firebasestorage.googleapis.com/v0/b/golden-cakeshop.appspot.com/o/files%2FScreenshot%20(164).png%20%20%20%20%20%20%202023-6-28%2013%3A56%3A27?alt=media&token=f459152c-eba2-46bb-b0fe-4e9efa425e71");
        setDesign(filename);
      }
      catch (error) {
      console.error('Error uploading fil:', error);
      setDesign("");
    }
  };

  const product={
    id:uuid().slice(0,8),
    name:"Customized Cake",
    category:"Customized Cake",
    price:0,
    image:[design],
    stock:5,
  }

  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  // }
  return (
    <>
    <Wrapper>
    <div class="container">
    <h2>Customize cake</h2>
    <div className="instruction">
     <p style={{fontWeight:"bold",}}>Instructions:</p>
     
     <p> 1)  Payment mode is cash on Delivery.</p> 
     <p> 2)  After conformation of Order,Mail is sended on your email with Price.Confirm your order there.</p>
    </div>
    <hr />
    
    
      <div className="form-group">
        <label for="Design">Design:</label>
      <input type="file" name="Design" onChange={handleImageUpload}/>
      </div>
      <span>
      <div className="form-group">
        <label for="Flavour">Flavour:</label>
        <input type="text" id="Flavour" name="Flavour" value={flavour} onChange={(e)=>setFlavour(e.target.value)}/>
      </div>
      <div className="form-group">
        <label for="Weight">Weight(in kg) :</label>
        <input type="text" id="Weight" name="Weight" value={wt} onChange={(e)=>setWeight(e.target.value)}/>
      </div>
      </span>
      <div className="form-group">
        <label for="Cake">Name on Cake(if any) :</label>
        <input type="text" id="bname" name="bname" value={bname} onChange={(e)=>setBname(e.target.value)}/>
      </div>
      <div className="form-group">
        <label for="Weight">Addtional Details(topping,color etc..):</label>
        <textarea  id="additional" name="additional" value={detail} onChange={(e)=>setDetail(e.target.value)}/>
      </div>

     

      <NavLink to="/cart" onClick={() => addToCart(product.id, flavour,wt, amount,bname,product,true,detail )}>
        <Button className="btn">Add To Cart</Button>
      </NavLink>
   
  </div>

  </Wrapper>
    </>
  )
}

export default CustomizeCake;


const Wrapper = styled.section`
 
 .main{
  display:grid;
  grid-template-column:2;
 }
 span{
    display:flex;

 }

  .container {
    max-width: 560px;
    margin: 0 auto;
    margin-top:4rem;
    padding: 30px;
    border-radius: 5px;
    background-color:white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  .container h2 {
    text-align: center;
    margin-bottom: 40px;
    color: black;
  }

  .form-group {
    margin-bottom: 20px;
    font-size:20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    color: black;
  }
  .error{
    color:red;
    font-size:15px;
  } 

  .form-group input[type="text"] {
    width: 96%;
    padding: 10px;
    height:4rem;
    border: none;
    border-radius: 3px;
    background-color: #f5f5f5;
    color: #333333;
    box-sizing: border-box;
  }
  textarea{
    width: 98%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    background-color: #f5f5f5;
    color: #333333;
    box-sizing: border-box;
  }
  .form-group input[type="file"]{
    width: 98%;
   text-align:center;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    padding:10px;
    height:4rem;
    font-size:1.3rem;
  }
  .form-group input[type="submit"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    background-color: #ff187f;
    color: #ffffff;
    cursor: pointer;
  }

  .form-group input[type="submit"]:hover {
    background-color: #d61c79;
  }

  @media (max-width: 480px) {
    .container {
      width: 85%;
      
      margin-left: auto;
      margin-right: auto;
    }
    .form-group{
        font-size:15px;
    }
    .container h2{
        font-size:30px;
    }
  }


    `;