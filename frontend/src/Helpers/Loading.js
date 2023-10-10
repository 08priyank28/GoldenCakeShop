
import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <h1 className="loading-text">Loading...</h1>
    </div>
    </Wrapper>
  );
};

export default Loading;


const Wrapper = styled.section`
/* Loading.css */

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 24px;
  margin-top: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

    `;