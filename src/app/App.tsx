import styled from 'styled-components';
import Router from '../navigation/Router';
import HeaderWrapper from '../navigation/wrappers/HeaderWrapper';
import { useEffect, useRef, useState } from 'react';
import FooterWrapper from '../navigation/wrappers/FooterWrapper';
import { useTheme } from './AppStyling';
import GlobalStyles from '../styles/GlobalStyles';
import LoginPage from './LoginPage';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import YourInvitationView from '../navigation/views/YourInvitationView';
import DashboardView from '../navigation/views/DashboardView';
import UploadView from '../navigation/views/UploadView';
import ImagesView from '../navigation/views/ImagesView';
import MusicRequestView from '../navigation/views/MusicRequestView';
import SongRequestsView from '../navigation/views/SongRequestsView';

const AppContainer = styled.div`
  min-height: 100vh;
  margin: auto;
  background-color: ${() => useTheme().colors.mix.dark};
  overflow-x: hidden;
`;
const ContentContainer = styled.div`
  background-color: ${() => useTheme().colors.red.secondary};
  min-height: 90vh;
  display: flow-root;
`;

function App() {
  const applicationRef = useRef<HTMLDivElement | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  const handleLogin = (role: string) => {
    setUserRole(role);
    console.log(role);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_expiry');
    localStorage.removeItem('auth_role');
    setUserRole(null);
    setLoggedIn(false);
  };

  useEffect(() => {
    const storedExpiry = localStorage.getItem('auth_expiry');
    const storedRole = localStorage.getItem('auth_role');

    if (storedExpiry && storedRole) {
      const now = new Date().getTime();
      if (now < parseInt(storedExpiry)) {
        setLoggedIn(true);
        setUserRole(storedRole);
      } else {
        localStorage.removeItem('auth_expiry');
        localStorage.removeItem('auth_role');
      }
    }
  }, []);

  const isInvitationPage = location.pathname.startsWith('/your-invitation');
  const isDashboardPage = location.pathname === '/dashboard';
  const isUploadPage = location.pathname.startsWith('/upload');
  const isImagesPage = location.pathname === '/images';
  const isMusicRequestPage = location.pathname === '/music';
  const isSongRequestsPage =
    location.pathname === '/new-requests' || location.pathname === '/new-reqests';

  return (
    <>
      <GlobalStyles />
      {(isInvitationPage ||
        isDashboardPage ||
        isUploadPage ||
        isImagesPage ||
        isMusicRequestPage ||
        isSongRequestsPage) ? (
        <Routes>
          <Route path="/your-invitation/:code" element={<YourInvitationView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="/upload/:eventId" element={<Navigate replace to="/upload" />} />
          <Route path="/images" element={<ImagesView />} />
          <Route path="/music" element={<MusicRequestView />} />
          <Route path="/new-reqests" element={<Navigate replace to="/new-requests" />} />
          <Route path="/new-requests" element={<SongRequestsView />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : loggedIn ? (
        <AppContainer ref={applicationRef}>
          <HeaderWrapper logoutCallback={() => handleLogout()} />
          <ContentContainer id="application-content-ref">
            <Router role={userRole} />
          </ContentContainer>
          <FooterWrapper />
        </AppContainer>
      ) : (
        <LoginPage loginCallback={handleLogin} />
      )}
    </>
  );
}

export default App;
