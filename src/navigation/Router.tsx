import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomeView from "./views/HomeView";
import RSVPView from './views/RSVPView';
import ScheduleView from './views/ScheduleView';
import TravelView from './views/TravelView';
import YourStayView from './views/YourStayView';
import QAView from './views/QAView';
import { scrollToTop } from '../helpers/functions';
import AboutView from './views/AboutView';
import YourInvitationView from './views/YourInvitationView';

const homeUrl = '/home';
const aboutUrl = '/about-us';
const yourStayUrl = '/your-stay';
const rsvpUrl = '/rsvp';
const scheduleUrl = '/schedule';
const travelUrl = '/travel';
const qaUrl = '/qa';
const yourInvitationUrl = '/your-invitation/:code';
function Router({ role }: { role: string | null }) {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={homeUrl} />} />
      <Route path={homeUrl} element={<HomeView />} />
      <Route path={aboutUrl} element={<AboutView />} />
      <Route path={yourStayUrl} element={<YourStayView role={role} />} />
      <Route path={rsvpUrl} element={<RSVPView viewRole={role} />} />
      <Route path={scheduleUrl} element={<ScheduleView />} />
      <Route path={travelUrl} element={<TravelView />} />
      <Route path={qaUrl} element={<QAView />} />
      <Route path={yourInvitationUrl} element={<YourInvitationView />} />
      <Route path="*" element={<Navigate replace to={homeUrl} />} />
    </Routes>
  );
}

export default Router;