import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import { account, checkAndCreateDocument } from './AppwriteConfig.js';
import { useNavigate } from 'react-router-dom';



export default function App() {
  const navigate = useNavigate();
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // Try to get the session
      } catch (error) {
        navigate("/"); // If it fails, navigate to the root route
      }
    };
  
    checkSession();
  }, [account, navigate]);

  return (
    <div className={darkmode ? "dark" : ""}>
      <Navbar setDarkmode={setDarkmode} darkmode={darkmode} />
      <Main />
    </div>
  );
}