import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { DashboardLayout, RootLayout } from './components/layouts';
import { HomePage, DashboardPage, NotFoundPage } from './pages';
import { useAuth0 } from '@auth0/auth0-react';
import AuthGuard from './guards/auth-guard';
import { PageLoader } from './components/shared';

const MyAuctionsPage = React.lazy(
  () => import('./pages/MyAuctions/MyAuctions')
);
const ProfilePage = React.lazy(() => import('./pages/Profile/Profile'));
const NotificationsPage = React.lazy(
  () => import('./pages/Notifications/Notifications')
);
const SettingsPage = React.lazy(() => import('./pages/Settings/Settings'));

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="">
        <PageLoader />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />}></Route>
      </Route>
      <Route
        path="/dashboard"
        element={<AuthGuard component={DashboardLayout} />}
      >
        <Route index element={<DashboardPage />}></Route>
        <Route
          path="my-auctions"
          element={
            <React.Suspense fallback={<div>Loading My Auctions ..</div>}>
              <AuthGuard component={MyAuctionsPage} />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <React.Suspense fallback={<div>Loading Profile ..</div>}>
              <AuthGuard component={ProfilePage} />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="notifications"
          element={
            <React.Suspense fallback={<div>Loading Notifications ..</div>}>
              <AuthGuard component={NotificationsPage} />
            </React.Suspense>
          }
        ></Route>
        <Route
          path="settings"
          element={
            <React.Suspense fallback={<div>Loading Settings ..</div>}>
              <AuthGuard component={SettingsPage} />
            </React.Suspense>
          }
        ></Route>
      </Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
