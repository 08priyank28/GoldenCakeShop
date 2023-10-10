import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";
import axios from 'axios';
import { URI } from "../App";


const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  singleProduct: {}
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (data) => {

    dispatch({ type: "SET_LOADING" });
    try {

      const products = await data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  const getSingleProduct = async (data) => {

    dispatch({ type: "SET_LOADING" });
    try {

      const singleProduct = await data;
      dispatch({ type: "SINGLEPAGE_SET_API_DATA", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    axios.get(`${URI}/cakes/allcakes`)
      .then(response => {
        getProducts(response.data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
     
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
  );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };