import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { LogOut } from "lucide-react";

const Container = styled.div`
  height: 100%;
  display: flex;
`;
const MenuLinkItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  margin: 0 1.9em;

  font-family: "linnea-variable", "PP Cirka", sans-serif;
  font-size: 1rem;

  color: ${({ theme }) => theme.colors.red.primary};
  text-decoration: none;

  &:link,
  &:visited {
    color: ${({ theme }) => theme.colors.red.primary};
  }

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.colors.red.primary};
    text-decoration: underline;
  }

  @media (min-width: 1250px) {
    font-size: 1.1rem;
  }

  @media (min-width: 1350px) {
    font-size: 1.2rem;
  }
`;
const LogoutItem = styled.div`
  display: flex;
  gap: 1em;
  text-decoration: none;
  color: ${() => useTheme().colors.red.primary};
  margin: 0em 2.5em;
  :hover {
    color: ${() => useTheme().colors.red.secondary};
  }
`;
const MenuItemText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ::selection {
    color: none;
    background: none;
  }
  /* For Mozilla Firefox */
  ::-moz-selection {
    color: none;
    background: none;
  }
`;

function HeaderMenu({ userLogoutCallback }: { userLogoutCallback: () => void }) {
  const location = useLocation();

  const [toggledItem, setToggledItem] = useState('instruments');
  useEffect(() => {
    setToggledItem(location.pathname.replace('/', ''));
  }, [location.pathname]);

  return (
    <Container id="header-menu-ref">
      <MenuLinkItem
        to={'home'}
        color={toggledItem === 'home' ? 'black' : 'white'}
      >
        <MenuItemText>Home</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="toastmasters"
        color={toggledItem === 'toastmasters' ? 'black' : 'white'}
      >
        <MenuItemText>Toastmasters</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="info"
        color={toggledItem === 'info' ? 'black' : 'white'}
      >
        <MenuItemText>Info</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="accomodation"
        color={toggledItem === 'accomodation' ? 'black' : 'white'}
      >
        <MenuItemText>Accomodation</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="upload"
        color={toggledItem === 'upload' ? 'black' : 'white'}
      >
        <MenuItemText>Upload</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="schedule"
        color={toggledItem === 'schedule' ? 'black' : 'white'}
      >
        <MenuItemText>Schedule</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="travel"
        color={toggledItem === 'travel' ? 'black' : 'white'}
      >
        <MenuItemText>Travel</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="qa"
        color={toggledItem === 'qa' ? 'black' : 'white'}
      >
        <MenuItemText>Q/A</MenuItemText>
      </MenuLinkItem>
      <LogoutItem onClick={() => userLogoutCallback()}>
        <MenuItemText>
          <LogOut size={22} />
        </MenuItemText>
      </LogoutItem>
    </Container>
  );
}

export default HeaderMenu;