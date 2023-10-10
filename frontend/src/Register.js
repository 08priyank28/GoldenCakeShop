import React from 'react';
import styled from "styled-components";
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import {URI} from './App';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

    const submit=async(formData) => {
      try {
        const response = await axios.post(`${URI}/users/new`,
        {
          name:formData.name,
          email:formData.email,
          mobileno:formData.mobileno,
          date:formData.date,
          password:formData.password

        });
        navigate('/login');
        toast.success(response.data.message); // Handle the response data as needed
      } catch (error) {
        toast.error(error.message); // Handle any errors that occur during the request
      } 
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobileno: Yup.string().min(10, "too short").max(10, "too long").required('MobileNo is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        date: Yup.date()
        .required('Birthdate is required')
        .max(new Date(), 'Birthdate must be in the past')
      });

      const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          mobileno:'',
          password: '',
          date:'',
        },
        validationSchema: validationSchema,
        onSubmit: submit, 
      });

  return (
    <>
    <Wrapper>
    <div className="container">
    <h2>Register Yourself</h2>
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
      </div>
      <div className="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
      </div>
      <div className="form-group">
        <label for="email">MobileNo:</label>
        <input type="text" id="mobileno" name="mobileno" value={formik.values.mobileno} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.mobileno && formik.errors.mobileno && <div className="error">{formik.errors.mobileno}</div>}
      </div>
      <div className="form-group">
        <label for="email">Date of Birth:</label>
        <input type="date" id="date" name="date" value={formik.values.date} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.date && formik.errors.date && <div className="error">{formik.errors.date}</div>}
      </div>
      <div className="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required/>
        {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}
      </div>
      <div className="form-group">
        <input type="submit" value="Register"/>
      </div>
    </form>
  </div>
  </Wrapper>
    </>
  )
}

export default Register;


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

  .form-group input[type="text"],
  .form-group input[type="email"],
  .form-group input[type="mobileno"],
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