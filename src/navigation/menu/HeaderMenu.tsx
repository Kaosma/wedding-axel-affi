import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LogOut } from "lucide-react";
import { useTheme } from "../../app/AppStyling";

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const MenuLinkItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
  margin: 0 1.9em;

  font-family: "linnea-variable", "PP Cirka", sans-serif;
  font-size: 1rem;
  color: ${useTheme().colors.red.primary};
  text-decoration: none;

  &:link,
  &:visited {
    color: ${useTheme().colors.red.primary};
  }

  &:hover,
  &:focus {
    color: ${useTheme().colors.red.primary};
    text-decoration: underline;
  }

  &.active {
    text-decoration: underline;
    text-underline-offset: 0.2em;
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
  color: ${useTheme().colors.red.primary};
  margin: 0 2.5em;

  &:hover {
    color: ${useTheme().colors.red.secondary};
  }
`;

const MenuItemText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &::selection {
    color: none;
    background: none;
  }

  &::-moz-selection {
    color: none;
    background: none;
  }
`;

function HeaderMenu({
  userLogoutCallback,
}: {
  userLogoutCallback: () => void;
}) {
  return (
    <Container id="header-menu-ref">
      <MenuLinkItem to="/home" end>
        <MenuItemText>Home</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/toastmasters">
        <MenuItemText>Toastmasters</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/info">
        <MenuItemText>Info</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/accomodation">
        <MenuItemText>Accommodation</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/upload">
        <MenuItemText>Upload</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/schedule">
        <MenuItemText>Schedule</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/travel">
        <MenuItemText>Travel</MenuItemText>
      </MenuLinkItem>

      <MenuLinkItem to="/qa">
        <MenuItemText>Q/A</MenuItemText>
      </MenuLinkItem>

      <LogoutItem onClick={userLogoutCallback}>
        <MenuItemText>
          <LogOut size={22} />
        </MenuItemText>
      </LogoutItem>
    </Container>
  );
}

export default HeaderMenu;