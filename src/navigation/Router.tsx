import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomeView from "./views/HomeView";
import RSVPView from './views/RSVPView';
import ScheduleView from './views/ScheduleView';
import TravelView from './views/TravelView';
import QAView from './views/QAView';
import { scrollToTop } from '../helpers/functions';
import ToastmastersView from './views/ToastmastersView';
import YourInvitationView from './views/YourInvitationView';
import InfoView from './views/InfoView';
import AccomodationView from './views/AccomodationView';

const homeUrl = '/home';
const toastmastersUrl = '/toastmasters';
const infoUrl = '/info';
const accomodationUrl = '/accomodation';
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
      <Route path={homeUrl} element={<HomeView role={role} />} />
      <Route path={toastmastersUrl} element={<ToastmastersView />} />
      <Route path={infoUrl} element={<InfoView role={role} />} />
      <Route path={accomodationUrl} element={<AccomodationView />} />
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