import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AlignJustify, LogOut } from "lucide-react";
import { useTheme } from "../../app/AppStyling";
import { useTranslation } from 'react-i18next';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  padding: 0;
`;
const MenuButton = styled.button`
  background: none;
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: none;
  }
`;
const DropdownMenu = styled.div`
  position: fixed;
  top: 100px;
  left: 0;
  width: 100vw;
  background-color: #fff8f1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled(Link)`
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: black;
  display: flex;
  border-radius: 0.5rem;
  font-family: "linnea-variable", "PP Cirka", sans-serif;
  &:hover {
    background-color: ${() => useTheme().colors.peach.lightest};
    color: black;
  }
`;
const LogoutButton = styled.button`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "linnea-variable", "PP Cirka", sans-serif;
  &:hover {
    background-color: #ffe5e5;
  }
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

function MenuDropdown({ userLogoutCallback }: { userLogoutCallback: () => void }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const logout = () => {
    userLogoutCallback();
    closeMenu(); // also close on logout
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <DropdownContainer ref={dropdownRef}>
      <MenuButton onClick={toggleMenu} aria-label="Menu">
        <AlignJustify size={24} color="white" />
      </MenuButton>

      {open && (
        <DropdownMenu>
          <MenuItem to="/home" onClick={closeMenu}>{t('home')}</MenuItem>
          <MenuItem to="/about-us" onClick={closeMenu}>Toastmasters</MenuItem>
          <MenuItem to="/your-stay" onClick={closeMenu}>{t('yourStay')}</MenuItem>
          <MenuItem to="/upload" onClick={closeMenu}>{t('upload')}</MenuItem>
          <MenuItem to="/schedule" onClick={closeMenu}>{t('schedule')}</MenuItem>
          <MenuItem to="/travel" onClick={closeMenu}>{t('travel')}</MenuItem>
          <MenuItem to="/qa" onClick={closeMenu}>{t('qa')}</MenuItem>
          <LogoutButton onClick={logout}>{t('logout')} <LogOut size={22} /></LogoutButton>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default MenuDropdown;