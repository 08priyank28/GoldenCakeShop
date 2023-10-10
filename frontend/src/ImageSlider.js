import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import  styled from 'styled-components';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1)>=0?prevIndex - 1:images.length-1);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1)<images.length?prevIndex + 1:0);
  };

  return (
    <Wrapper>
       { images?
    <div className="image-slider">
      <img src={images[currentIndex]} alt="Slider"  className="images"/>

      <div className="arrow-container">
      <button className="arrow left" onClick={handlePrev} >
        <FaArrowLeft /> 
      </button>

      <button className="arrow right" onClick={handleNext} >
        <FaArrowRight /> 
      </button>
      </div>
    </div> :""}
    </Wrapper>
  );
};

export default ImageSlider;


const Wrapper = styled.section`
.image-slider {
    position: relative;
  }
  
  .images {
    width: 100%;
    height: auto;
  }
  
  .arrow-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  
  .arrow {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    transition: background-color 0.3s;
    margin: 0 5px;
  }
  
  .arrow:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  @media (max-width: 768px) {
    
  
    .arrow {
      margin: 5px 0;
      font-size:15px;
      padding:5px;
    }
  }
  
  
  `;