import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMenu from '../menu/HeaderMenu';
import { useTheme } from '../../app/AppStyling';
import { rgba } from 'polished';
import { logoUrl } from '../../helpers/constants';
import { IsLargeScreen, scrollToTop } from '../../helpers/functions';
import MenuDropdown from '../menu/MenuDropdown';

const Container = styled.div`
  background-color: ${() => rgba(useTheme().colors.terracotta.secondary, 0.95)};
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1001;
  backdrop-filter: blur(10px);
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
        <AppLogo src={logoUrl} alt="Logo" />
      </IconContainer>
      {isLargeScreen ? <HeaderMenu userLogoutCallback={() => logoutCallback()} /> : <MenuDropdown userLogoutCallback={() => logoutCallback()} />}
    </Container>
  );
}

export default HeaderWrapper;