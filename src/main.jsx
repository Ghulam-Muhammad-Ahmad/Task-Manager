import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import RegisterLogin from './components/RegisterLogin.jsx';
import { account } from './AppwriteConfig.js';
const CheckSession = ({ children }) => {
  const navigate = useNavigate(); // Moved inside the component

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        if (session) {
          navigate('/todos');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, [account, navigate]); // Added dependencies

  return children;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CheckSession><RegisterLogin /></CheckSession>} />
      <Route path="/todos" element={<App />} />
      <Route path="*" element={<RegisterLogin />} /> {/* Replace with a 404 component or a default route */}
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);