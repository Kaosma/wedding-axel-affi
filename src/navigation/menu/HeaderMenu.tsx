import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { LogOut } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  height: 100%;
  display: flex;
`;
const MenuLinkItem = styled(Link) <{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  text-decoration: none;
  color: ${({ color }) => color};
  margin: 0em 1.9em;
  font-family: "linnea-variable", "PP Cirka", sans-serif;
  font-size: 1rem;
  :hover {
    color: ${() => useTheme().colors.peach.tertiary};
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
  color: white;
  margin: 0em 2.5em;
  :hover {
    color: ${() => useTheme().colors.peach.tertiary};
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
  const { t } = useTranslation();
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
        <MenuItemText>{t('home')}</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="about-us"
        color={toggledItem === 'about-us' ? 'black' : 'white'}
      >
        <MenuItemText>Toastmasters</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="your-stay"
        color={toggledItem === 'your-stay' ? 'black' : 'white'}
      >
        <MenuItemText>{t('yourStay')}</MenuItemText>
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
        <MenuItemText>{t('schedule')}</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="travel"
        color={toggledItem === 'travel' ? 'black' : 'white'}
      >
        <MenuItemText>{t('travel')}</MenuItemText>
      </MenuLinkItem>
      <MenuLinkItem
        to="qa"
        color={toggledItem === 'qa' ? 'black' : 'white'}
      >
        <MenuItemText>{t('qa')}</MenuItemText>
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