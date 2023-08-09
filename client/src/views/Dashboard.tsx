import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  
  useEffect(() => {
    if (accessToken === undefined) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  console.log('Dashboard:', accessToken);
  return (
    <>
      Dashboard
    </>
  )
};
