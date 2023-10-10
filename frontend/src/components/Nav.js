import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { CgMenu, CgClose } from "react-icons/cg";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { URI } from "../App";
const Nav = () => {
  const [menuIcon, setMenuIcon] = useState();
  const { total_item } = useCartContext();
  const { logout,isAuthenticated,isAdmin,user } = useUserContext();
  const [cuser,setUser]=useState();
  useEffect(() => {
    // Replace 'your-backend-api-url' with the actual URL of your backend API
    axios.post(`${URI}/users/getnamebyemail`,{email:user?.email})
      .then((response) => {
        console.log(response.data.userName)
        setUser(response.data.userName)
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  });

  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
       align-items: center;
      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }
        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }
    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }
    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }
    .close-outline {
      display: none;
    }
    .cart-trolley--link {
      position: relative;
      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }
      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        color:white;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }
    .user-login--name {
      text-transform: capitalize;
    }
    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};
        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }
      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        margin-top:-20px;
        margin-right:5px;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }
      .active .close-outline {
        display: inline-block;
      }
      .navbar-lists {
        width: 100vw;
        height: 120vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        //  transform-origin: top; 
        transition: all 3s linear;
      }
      .active .navbar-lists {
          visibility: visible;
          opacity: 1;
          transform: translateX(0);
          z-index: 999;
         transform-origin: right;
         transition: all 1s linear;
        .navbar-link {
          font-size: 2.5rem;
        }
       margin-left:-91vw;
       margin-top:-4rem;
      }
      .cart-trolley--link {
        position: relative;
        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }
        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
          color:white;
        }
      }
      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
    .profile{
      display:flex;
     flex-direction:column;
      margin-top:20px;
     align-items:center;
     justify-content:center;
     
    
    }
  `;

  return (
    <Nav>
      <div className={menuIcon ? "navbar active" : "navbar"}>
        <ul className="navbar-lists">
        {isAuthenticated && isAdmin?
        
        <li>
            <NavLink
              to="/admin"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
               AdminPanel
            </NavLink>
          </li>
           :""}
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Home
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/about"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Cakes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customizecake"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Customize-Cake
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}>
              Contact
            </NavLink>
          </li>
         
          {!isAuthenticated?
          <>
          <li>
            <NavLink
              to="/register"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
              >
               Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className="navbar-link "
              onClick={() => setMenuIcon(false)}
              >
              Login
            </NavLink>
          </li>
          </>
           :
           <>
           <li>
           <NavLink
             to="/yourOrder"
             className="navbar-link "
             onClick={() => setMenuIcon(false)}>
             View Order
           </NavLink>
         </li>
        
          <li>
            <NavLink
              to="/"
              className="navbar-link "
              onClick={()=>{
                logout();
                setMenuIcon(false);
              }}
              >
              Logout
            </NavLink>
          </li>
          </>
           }
         
          <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link" onClick={()=>{
                setMenuIcon(false);
              }}>
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item} </span>
            </NavLink>
          </li>
          {isAuthenticated?
          <li>
           <NavLink
             to="#"
             className="navbar-link "
             onClick={() => setMenuIcon(false)}>
              <div className="profile">

              <div><img src="/images/profile.png" height="40" width="40" alt="" /></div>
            <div>{cuser}</div>
            </div>
           </NavLink>
         </li>
           :""}
          
          
        </ul>

        {/* two button for open and close of menu */}
        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setMenuIcon(true)}
          />
          <CgClose
            name="close-outline"
            className="mobile-nav-icon close-outline"
            onClick={() => setMenuIcon(false)}
          />
        </div>
      </div>
    </Nav>
  );
};

export default Nav;