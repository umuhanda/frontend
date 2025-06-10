import { Navigate, Outlet } from 'react-router-dom';

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
};

export const isAuthenticated = () => {
  let token = sessionStorage.getItem('token');
  if (!token) token = getCookie('authToken');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime; // Check if token is still valid
  } catch (error) {
    console.error('❌ Invalid token format:', error);
    return false; // Invalid token format
  }
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
