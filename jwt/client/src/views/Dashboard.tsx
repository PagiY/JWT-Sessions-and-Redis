import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/logout';

import { AuthContext } from '../contexts/AuthContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AuthContext);

  const handleLogout = () => {
    console.log('logging out');
    logout()
      .then(() => {
        setAccessToken(undefined);
        navigate('/');      
      });
  };

  return (
    <>
      Dashboard
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
};
