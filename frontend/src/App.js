import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./Register";
import Login from "./Login";
import Order from "./Order";
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {  useUserContext } from "./context/user_context";
import CustomizeCake from "./customizeCake";
import AdminPanel from "./adminpanel";
import AddCake from "./addcake";
import YourOrder from "./yourOrder";
import ShippingAddressForm from "./shipping";
import { ShippingProvider } from "./context/shipping_context";
import ConfirmOrder from "./confirmOrder";
import CancelOrders from "./cancelOrder";
 export const URI="http://localhost:4000/api/v1";
//export const URI="https://goldencakeshop.onrender.com/api/v1";
const stripePromise = loadStripe('pk_test_51N6qNZSEnGA13Sm4NafrTQiwVDb6o1I3x7HTXpMl2kd5haOWHT6QVGZUgneEu0fnUt4RC3FXXS6XdNXXDLr7dOWi00QM7ZNwUt');

const App = () => {
  const {isAuthenticated,isAdmin}=useUserContext();
   
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",   
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8B0000",

      bg: "#ffe6ee",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <>
      
    <ThemeProvider theme={theme}>
    <ToastContainer/>
    <ShippingProvider>
      <Router>
        <GlobalStyle />
        <Header />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} /> 
           <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/customizecake" element={<CustomizeCake/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={isAuthenticated && isAdmin? <AdminPanel />: <ErrorPage />} />
          <Route path="/admin/addcake" element={isAuthenticated && isAdmin? <AddCake />: <ErrorPage />} />
          <Route path="/order" element={ <Elements stripe={stripePromise}>
                                         {isAuthenticated? <Order />: <ErrorPage />}
                                         </Elements>} />:
          <Route path="/yourorder" element={<YourOrder />} />
          <Route path="/shipping" element={<ShippingAddressForm />} />
          <Route path="/confirmOrder" element={<ConfirmOrder />} />
          <Route path="/cancelOrders" element={<CancelOrders />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
      </ShippingProvider>
    </ThemeProvider>
    </>
  );
};

export default App;

