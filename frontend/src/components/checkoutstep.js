import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import styled from 'styled-components';
import { Typography, Stepper, StepLabel, Step } from "@mui/material";


const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon sx={{fontSize:50}}/>,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon sx={{fontSize:50}}/>,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon sx={{fontSize:50}}/>,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Wrapper>
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
    </Wrapper>
  );
 
};

export default CheckoutSteps;


const Wrapper = styled.section`
.MuiStepConnector-line {
    display: none !important;
  }
  
  .MuiStepConnector-root {
    height: 1px;
    background-color: rgba(0, 0, 0, 0.349);
  }
  
  .MuiStepConnector-active,
  .MuiStepConnector-completed {
    background-color: red;
  }
  `;