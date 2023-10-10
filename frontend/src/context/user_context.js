
import { useState } from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import userReducer from "../reducer/userReducer";
import Cookies from 'js-cookie';
import axios from 'axios';
import {URI} from '../App.js';
const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  token:'',
  isAdmin:false,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [token, setToken] = useState('');
  const [userr,setUser]=useState('');
  const [isAdmin,setisAdmin]=useState(false);
  useEffect(() => {
     // Retrieve the token from the cookie
      const cookieToken = Cookies.get('token');
      const user = Cookies.get('user');
      const admin = Cookies.get('isadmin');
      
      if (cookieToken && user) {
        setToken(cookieToken);
        setUser(JSON.parse(user));
        setisAdmin(admin==="true")
      }

  }, []);

  useEffect(() => {
    if (token && userr) {
      // Dispatch the LOGIN action with the user and token

      dispatch({ type: 'LOGIN', payload: { user: userr, token } });

      dispatch({ type: 'SET_ADMIN', payload: isAdmin });
    } else {
      // Dispatch the LOGOUT action if the token is not available
      dispatch({ type: 'LOGOUT' });
    }
  }, [token]);

  const login = (user, token,isAdmin) => {
    // Set the token in the cookie
    Cookies.set('token', token);
    setToken(token);
    
    Cookies.set('user', JSON.stringify(user));
    setUser(user)

    Cookies.set('isadmin', isAdmin);
    setisAdmin(isAdmin)
    
  };

  const logout = async() => {
    // Remove the token from the cookie and state
    Cookies.remove('token');
    setToken('');
    Cookies.remove('user');
    setUser('');
    Cookies.remove('isadmin');
    setisAdmin(false);
    toast.success("logout succesfully");

    try{
    await axios.get(`${URI}/users/logout`,{withCredentials:true});
    }
    catch(e){
    console.log(e);
  }
  };
  return (
    <AppContext.Provider value={{ user: state.user,isAuthenticated: state.isAuthenticated,isAdmin:state.isAdmin, login, logout }}>{children}</AppContext.Provider>
  );
};

// Custom hook
const useUserContext = () => {
  return useContext(AppContext);
};

export { UserProvider, AppContext, useUserContext };