import React, { useState,useEffect } from 'react'
import GridView from './GridView'
import axios from 'axios';
import { URI } from '../App';
import { useNavigate } from 'react-router-dom';
const Cakes = () => {
    const [cakes,setCakes]=useState([]);
    const navigate=useNavigate();
    const [requestData, setRequestData] = useState(new Date());
    useEffect(()=>{

        const getAllCakes=async(req,res)=>{
            await axios.get(`${URI}/cakes/allcakes`)
            .then(response => {
             setCakes(response.data);
           })
           
           .catch(error => {
             console.error('Error fetching data:', error);
           });
        }
         getAllCakes();
   },[requestData])
  return (
    <>
      
    <div className="cake-actions">
      <button className="btn btn-primary" onClick={()=>navigate('./addcake')} > Add Cake</button>
    </div> 
    <p style={{marginTop:"10px"}}>Total No of Cakes: {cakes?cakes.length:""}</p>
     <GridView products={cakes?cakes:""} setRequestData={setRequestData} />
    </>
  )
}

export default Cakes