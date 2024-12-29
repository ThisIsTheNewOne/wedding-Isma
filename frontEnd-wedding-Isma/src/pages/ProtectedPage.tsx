import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import PasswordForm from './PasswordForm';
import fetchPassword from '../data/fetchingData/fetchpass';
import LoadingScreen from './LoadingPage';

const ProtectedPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      const storedAuth = localStorage.getItem('authTimestamp');
        if (storedAuth) {
          //   const isExpired = (Date.now() - parseInt(storedAuth)) > 600000; // 10 min
          const isExpired = (Date.now() - parseInt(storedAuth)) > 10;
          return !isExpired;
        }
        return false;
    });

    useEffect(() => {
      if (isAuthenticated) {
        localStorage.setItem('authTimestamp', Date.now().toString());
      }
    }, [isAuthenticated]);
    
    const [backendPassword, setBackendPassword] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPassword().then((password) => {
          setBackendPassword(password);
          setLoading(false);
        });
    }, []);

    const handleAuthentication = (password: string) => {
      //   const correctPassword = '12345';  // Replace with a secure password
      if (password === backendPassword) {
        setIsAuthenticated(true);
        localStorage.setItem('authTimestamp', Date.now().toString());
      } else {
        alert('Incorrect password. Try again.');
      }
    };

    if (loading) {
        return <LoadingScreen />;
      } 
  
  return (
    <div>
      {isAuthenticated ? (
        <HomePage />
      ) : (
        <PasswordForm onAuthenticate={handleAuthentication} />
      )}
    </div>
  );
};

export default ProtectedPage;
