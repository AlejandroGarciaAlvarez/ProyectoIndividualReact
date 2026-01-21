// src/router/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  // Si hay usuario, muestra el hijo (Dashboard), si no, redirige [cite: 105]
  return user ? children : <Navigate to="/login" />;
}