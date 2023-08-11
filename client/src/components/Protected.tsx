import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

type ProtectedProps = {
  children: React.ReactNode,
}

export const Protected = ({ children }: ProtectedProps) => {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  
  useEffect(() => {
    if (accessToken === undefined) {
      navigate('/');
    }
  }, [navigate, accessToken]);

  return (
    <>
      {children}
    </>
  )
};
