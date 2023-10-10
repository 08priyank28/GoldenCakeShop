import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Button} from "../styles/Button"
const PageNavigation = ({ title }) => {
  const navigate=useNavigate();
  return (
    <Wrapper>
      <Button  onClick={()=> navigate(-1)}>Go Back</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top:2rem;
   height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1rem;
  padding-left: 1.2rem;

  a {
    font-size:1.5rem;
  }
`;

export default PageNavigation;