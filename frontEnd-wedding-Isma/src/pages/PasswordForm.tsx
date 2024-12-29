import React, { useState } from 'react';

interface PasswordFormProps {
  onAuthenticate: (password: string) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onAuthenticate }) => {
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAuthenticate(password);
      setPassword('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h1>Password Required</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

 export default PasswordForm 