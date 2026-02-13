
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/Layout';
import { HomeScreen } from './components/Home';
import { ServicesScreen } from './components/Services';
import { BookingScreen } from './components/Booking';
import { BarbersScreen } from './components/Barbers';
import { AdminScreen } from './components/Admin';
import { GalleryScreen } from './components/Gallery';
import { MyBookingsScreen } from './components/MyBookings';
import { APP_MODE } from './constants';
import { App as CapApp } from '@capacitor/app';

// Inner component to access router hooks
const NavigationHandler: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle Hardware Back Button for Android
    const backListener = CapApp.addListener('backButton', ({ canGoBack }) => {
      if (location.pathname === '/' || location.pathname === '/admin') {
        // Exit app if on main screens
        CapApp.exitApp();
      } else {
        // Navigate back in history
        navigate(-1);
      }
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, [navigate, location]);

  return null;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <NavigationHandler />
        <div className="opacity-100">
          <Layout>
            {APP_MODE === 'admin' ? (
              <Routes>
                <Route path="/" element={<AdminScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/services" element={<ServicesScreen />} />
                <Route path="/booking" element={<BookingScreen />} />
                <Route path="/barbers" element={<BarbersScreen />} />
                <Route path="/gallery" element={<GalleryScreen />} />
                <Route path="/history" element={<MyBookingsScreen />} />
                <Route path="/admin" element={<AdminScreen />} />
              </Routes>
            )}
          </Layout>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
