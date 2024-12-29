import React, { useEffect, useState } from 'react';
import HomePage from './HomePage';
import PasswordForm from './PasswordForm';

const ProtectedPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('authTimestamp');
        if (storedAuth) {
          const isExpired = (Date.now() - parseInt(storedAuth)) > 600000; // 10 min
          return !isExpired;
        }
        return false;
      });

      useEffect(() => {
        if (isAuthenticated) {
          localStorage.setItem('authTimestamp', Date.now().toString());
        }
      }, [isAuthenticated]);

    const handleAuthentication = (password: string) => {
      const correctPassword = '12345';  // Replace with a secure password
      if (password === correctPassword) {
        setIsAuthenticated(true);
        localStorage.setItem('authTimestamp', Date.now().toString());
      } else {
        alert('Incorrect password. Try again.');
      }
    };
  
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
