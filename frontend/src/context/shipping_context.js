
import { useState } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import shippingReducer from "../reducer/shippingReducer";

const AppContext = createContext();

const initialState = {
  address: null,
  date: null,
};

const ShippingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shippingReducer, initialState);


  const setshippingData = (address,date) => {
    
    dispatch({ type: "SET_SHIPPING_DATA", payload:{address,date} });
    
  };

 
  return (
    <AppContext.Provider value={{ address: state.address,date: state.date, setshippingData:setshippingData }}>{children}</AppContext.Provider>
  );
};

// Custom hook
const useShippingContext = () => {
  return useContext(AppContext);
};

export { ShippingProvider, AppContext, useShippingContext };