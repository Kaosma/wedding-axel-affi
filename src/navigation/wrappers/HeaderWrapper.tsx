import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMenu from '../menu/HeaderMenu';
import { useTheme } from '../../app/AppStyling';
import { rgba } from 'polished';
import { IsLargeScreen, scrollToTop } from '../../helpers/functions';
import MenuDropdown from '../menu/MenuDropdown';

const Container = styled.div`
  background-color: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1001;
  backdrop-filter: blur(10px);
  border-bottom: 2px solid ${() => useTheme().colors.red.primary};
`;
const IconContainer = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
`;
const AppLogo = styled.img`
  color: white;
  width: 80px;
  height: 80px;
  fill: #3498db;
  transition: fill 0.3s ease;
`;

function HeaderWrapper({ logoutCallback }: { logoutCallback: () => void }) {
  const isLargeScreen = IsLargeScreen();

  return (
    <Container>
      <IconContainer to="/home" onClick={() => scrollToTop()}>
        <AppLogo src="/images/afsoonaxellogo.png" alt="Logo" />
      </IconContainer>
      {isLargeScreen ? <HeaderMenu userLogoutCallback={() => logoutCallback()} /> : <MenuDropdown userLogoutCallback={() => logoutCallback()} />}
    </Container>
  );
}

export default HeaderWrapper;