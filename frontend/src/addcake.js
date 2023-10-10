import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {URI} from "./App";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageNavigation from './components/PageNavigation';
const AddCake = () => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [flavors, setFlavors] = useState([]);
  const [weights, setWeights] = useState([]);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [egg, setEgg] = useState('');
  const [featured, setFeatured] = useState(0);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);

  const handleFlavorsChange = (e) => {
    setFlavors(e.target.value.split(','));
  };

  const handleWeightsChange = (e) => {
    setWeights(e.target.value.split(','));
  };

  const handleImageUpload = async(event) => {
    event.preventDefault();
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
      
        setImages(filename);
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setImages("");
    }
  };
  

  const handleReviewsChange = (e) => {
    setReviews(e.target.value.split(','));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    alert(egg)
    const newCake={
      name,
      price,
      flavours:flavors,
      weight:weights,
      image:images,
      egg,
      description,
      category,
      featured,
      stars,
      reviews
    };
    try {
      const response = await axios.post(`${URI}/cakes/addcake`, newCake);

          navigate('/admin');
           toast.success(response.data);
    
    } catch (error) {
      console.error('Error adding cake:', error);
    }
  };

  return (
    <Wrapper>
      <PageNavigation/>
    <div className="cake-page">
      <h2>Add a New Cake</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
       
        <label>
          Flavors:
          <input type="text" name="flavors" value={flavors.join(',')} onChange={handleFlavorsChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Weights:
          <input type="text" name="weights" value={weights.join(',')} onChange={handleWeightsChange} />
        </label>
        <label>
          Images:
          <input type="file" name="image" onChange={handleImageUpload} />
        </label>
        <label className="checkbox-label">
          Featured: 
          <input type="checkbox" id="featured" name="featured"  checked={featured} onChange={(e) => setFeatured(e.currentTarget.checked)} />
        </label>
       
        <label>
          Category:
          <input type="text" name="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Egg:
          {/* <input type="text" name="egg" value={egg} onChange={(e) => setEgg(e.target.value)} /> */}
          <select name="" id="" onClick={(e) => setEgg(e.target.value)} onChange={(e) => setEgg(e.target.value)} onBlur={(e) => setEgg(e.target.value)}>
            <option>Egg</option>
            <option>Eggless</option>
          </select>
        </label>
        <label>
          Description:
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Stars:
          <input type="number" name="stars" value={stars} onChange={(e) => setStars(e.target.value)} />
        </label>
        <label>
          Reviews:
          <input type="text" name="reviews" value={reviews.join(',')} onChange={handleReviewsChange} />
        </label>
        <button type="submit">Add Cake</button>
      </form>
    </div>
    </Wrapper>
  );
}

export default AddCake;

const Wrapper = styled.section`

.checkbox-label {
  display: flex;
  align-items: center;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  /* Add any additional styling here */
}
.cake-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .cake-page h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .cake-page form {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  
  @media (min-width: 768px) {
    .cake-page form {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media (min-width: 1024px) {
    .cake-page form {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  
  .cake-page label {
    display: block;
  }
  
  .cake-page select,
  .cake-page input[type="text"],
  .cake-page input[type="number"],
  .cake-page textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .cake-page button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cake-page button[type="submit"]:hover {
    background-color: #45a049;
  }
  
  
`;