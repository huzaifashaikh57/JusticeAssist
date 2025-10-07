import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Footer from './components/Footer';
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Home from './pages/Home';
import ReportForm from './pages/ReportForm';
import GetGuidance from './pages/GetGuidance';
import WhyUs from './pages/WhyUs';
import AboutUs from './pages/AboutUs';
import ScrollToTop from './components/ScrollToTop'; 
import CrimePredictor from './pages/CrimePredictor';
import CrimeDetail from './pages/CrimeDetail';
import Login from './pages/Login';
import ChatbotPopup from './components/ChatbotPopup';
import CyberAwareness from './pages/CyberAwareness';
import SuspectGuess from './pages/SuspectGuess';
import ContactUs from './pages/ContactUs';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Quiz from './pages/Quiz';
import AIAssistant from './pages/AIAssistant';

{/*import EmergencyHelp from './pages/EmergencyHelp';*/}



// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/reportform'];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = localStorage.getItem('role'); // 'admin' or 'user'

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, [location]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {/* Scroll to top on route change */}
      <ScrollToTop />

      {/* Conditional Navbars */}
      {!isAuthPage && (role === 'admin' ? <AdminNavbar /> : <UserNavbar />)}

      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        {/* Root path redirects based on login status */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} replace />}
        />

        <Route 
          path="/guidance/:id" 
          element={<CrimeDetail />} 
        />
        
        <Route path="/predictor" element={<CrimePredictor />} />

        


        {/*<Route path="/emergency-help" element={<EmergencyHelp />} />*/}


        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/get-guidance"
          element={
            <ProtectedRoute>
              <GetGuidance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/awareness" 
          element={
           <ProtectedRoute>
             <CyberAwareness />
           </ProtectedRoute>  
          } 
          />  

        <Route
          path="/suspect-guess" 
          element={
           <ProtectedRoute>
             <SuspectGuess />
           </ProtectedRoute>  
          } 
          />  

        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Footer condition */}
      {!isAuthPage && <Footer />}

      {/* ✅ Chatbot Popup (visible on all pages except login and chatbot) */}
      {!isAuthPage && location.pathname !== '/chatbot' && <ChatbotPopup />}
      
    </>
  );
};

export default App;
