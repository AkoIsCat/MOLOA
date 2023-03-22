import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
  width: 1302px;
  height: 62.5px;
  background: linear-gradient(to right, #252b2e 50%, #202427);
  margin: 0;
  padding: 0;
`;

const NavUl = styled.ul`
  height: 62.5px;
  margin: 0;
  padding: 0;
  display: flex;
  cursor: pointer;
`;

const NavLinkStyle = styled(NavLink)`
  width: 326px;
  height: 62.5px;
  line-height: 71.5px;
  list-style: none;
  font-size: 25px;
  text-align: center;
  margin: 0;
  color: #c1c1c1;
  border: 0px;
  text-decoration: none;
  font-family: 'Nanum Gothic';
  &:hover {
    background: #1e2225;
  }
  &.active {
    color: #fff;
    background: #1e2225;
  }
`;

const Navigaion = () => {
  return (
    <Nav>
      <NavUl>
        <NavLinkStyle to="/home">홈</NavLinkStyle>
        <NavLinkStyle to="/rank">랭킹</NavLinkStyle>
        <NavLinkStyle to="/guild">길드</NavLinkStyle>
        <NavLinkStyle to="/equipment">도구</NavLinkStyle>
      </NavUl>
    </Nav>
  );
};

export default Navigaion;
