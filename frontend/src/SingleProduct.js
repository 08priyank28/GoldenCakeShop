import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontex";
import PageNavigation from "./components/PageNavigation";
import { Container } from "./styles/Container";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/star"
import AddToCart from "./components/AddToCart";
import axios from "axios";
import { URI } from "./App";
import ImageSlider from './ImageSlider';





const SingleProduct = () => {
  const { getSingleProduct, isLoading, singleProduct } = useProductContext();
  const { id } = useParams();
  let x = Math.random()
  const {
    id: _id,
    name,
    price,
    description,
    category,
    stars,
    image,
  } = singleProduct;

  useEffect(() => {

    axios.get(`${URI}/cakes/${id}`)
      .then(response => {
        const cake = response.data;
        getSingleProduct(cake);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  if (isLoading) {
    return <div className="page_loading">Loading.....</div>;
  }


  return (
    <Wrapper>

      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
         
          <div className="product_images">
            <ImageSlider images={image} />


            <div className="delivery_details">
              <h3 style={{ fontWeight: "bold" }}>Delivery Details & Instructions :</h3>
              <ul>
                <li>1) The delicious cake is hand-delivered by our delivery boy in a good quality cardboard box.</li>
                <li>2) Candle and knife will be delivered as per the availability.</li>
                <li>3) After receiving, Please do not squeeze the sides of the box.</li>
                <li>4) Please keep it cool and away from direct sunlight.</li>
                <li>5) Immediately cover any leftover cake and refrigerate it.</li>
              </ul>
            </div>

          </div>

          {/* product data  */}
          <div className="product-data" style={{ boxShadow: "5px 5px 5px 5px lightgrey" }}>
            <h2>{name}</h2>
            <h3>{category} Cake</h3>
            <p><Star stars={stars} /></p>
            <p className="product-data-price">

              Price: ₹ {(Math.round(price + ((price * x * (9)) / 100))) - ((Math.round(price + ((price * x * (9)) / 100))) % 10)} 
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: ₹ {price} 
            </p>
            <p style={{ fontWeight: "bold" }}> Product Highlights:
              <pre style={{ fontFamily: "sans-serif", fontWeight: "normal" }} >{description}</pre>
            </p>

            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p className="services">Fast Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p className="services">Fresh & spongy</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p className="services">Golden Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p className="services">2 days freshness </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> In Stock</span>
              </p>
            </div>
            <AddToCart product={singleProduct} />
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};



const Wrapper = styled.section`

 



 .delivery_details{
  margin-top:2rem;
  font-size:1.7rem;
 }
 ol{
  margin:1rem;
  text-indent:1rem;
 
 }
 li{
  padding:0.5rem;
 }
  .container {
    padding: 3rem 0;
  }
  .product-data {
    padding:2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;
      .product-warranty-data {
        text-align: center;
        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }
    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;
      span {
        font-weight: bold;
      }
    }
    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }
  
  
  @media screen and (max-width: 402px) and (min-width:374px)  {
    margin:0 1rem ;
    .product-data{
       margin-top:10rem;
       width:95%;
       margin-left:0;
    }
    
    .images{
       height:70%;
       width:95%;
    }
    .services{
      margin:0 2rem;
    }
    .delivery_details{
      margin:0 1rem;
      margin-top:2rem;
    }
  }
  @media screen and (max-width: 500px) and (min-width:403px)  {
    margin:0 1rem ;
   
    .services{
      margin:0 2rem;
    }
    .delivery_details{
      margin:0 1rem;
      margin-top:2rem;
    }
  }
`;

export default SingleProduct;