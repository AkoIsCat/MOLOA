import styled from 'styled-components';
import React from 'react';

const BackBox = styled.div`
  width: 100%;
  height: 40px;
  background: rgb(41, 46, 51);
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-family: 'Nanum Gothic';
    color: #c1c1c1;
    font-size: 12px;
  }
`;

const Footer = () => {
  return (
    <BackBox>
      <p>Copyright © 2023 moloa</p>
    </BackBox>
  );
};

export default Footer;
