import React from 'react';
import styled from "styled-components";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import {URI} from './App';
import {  toast } from 'react-toastify';
import { useUserContext } from './context/user_context';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { login } = useUserContext();
  const navigate=useNavigate();

  const submit=async(formData) => {
    try {
      const response = await axios.post(`${URI}/users/login`,
      {
        email:formData.email,
        password:formData.password
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
      );
      
      login(formData,response.data.token,response.data.isAdmin);
      if(response.data.isAdmin)
      navigate('/admin');
      else
      navigate('/cart');
      toast.success(response.data.message); // Handle the response data as needed
      
    } catch (error) {
      toast.error("something is wrong"); // Handle any errors that occur during the request
    } 
  }


    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      });

      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: submit
      });

  return (
    <>
    <Wrapper>
    <div className="container">
    <h2>Login Yourself</h2>
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
      </div>
      <div className="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
      </div>
      <div className="form-group">
        <input type="submit" value="Login"/>
      </div>
    </form>
  </div>
  </Wrapper>
    </>
  )
}

export default Login;


const Wrapper = styled.section`
 
 

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

  .form-group input[type="email"],
  .form-group input[type="password"] {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 3px;
    background-color: #f5f5f5;
    color: #333333;
    box-sizing: border-box;
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