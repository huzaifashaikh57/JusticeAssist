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
import OnePageHome from './pages/OnePageHome';
import ReportForm from './pages/ReportForm';
import GetGuidance from './pages/GetGuidance';
import ScrollToTop from './components/ScrollToTop'; 
import CrimePredictor from './pages/CrimePredictor';
import CrimeDetail from './pages/CrimeDetail';
import ChatbotPopup from './components/ChatbotPopup';
import CyberAwareness from './pages/CyberAwareness';
import SuspectGuess from './pages/SuspectGuess';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Quiz from './pages/Quiz';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';


{/*import EmergencyHelp from './pages/EmergencyHelp';*/}



const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/reportform'];
  const role = localStorage.getItem('role'); // 'admin' or 'user'

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, [location]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <ScrollToTop />

      {/* Conditional Navbars */}
      {!isAuthPage && (role === 'admin' ? <AdminNavbar /> : <UserNavbar />)}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/quiz"
          element={<Quiz />}
        />

        <Route
          path="/"
          element={<OnePageHome />}
        />

        <Route 
          path="/guidance/:id" 
          element={<CrimeDetail />} 
        />
        
        <Route path="/predictor" element={<CrimePredictor />} />

        


        {/*<Route path="/emergency-help" element={<EmergencyHelp />} />*/}


        <Route
          path="/home"
          element={<OnePageHome />}
        />

        <Route
          path="/get-guidance"
          element={<GetGuidance />}
        />

        <Route
          path="/awareness" 
          element={<CyberAwareness />}
          />  

        <Route
          path="/suspect-guess" 
          element={<SuspectGuess />}
          />  

        <Route
          path="/report"
          element={<ReportForm />}
        />

        <Route
          path="/chatbot"
          element={<AIAssistant />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
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
