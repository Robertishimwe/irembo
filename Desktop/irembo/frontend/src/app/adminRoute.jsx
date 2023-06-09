import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { thisUser } from '../redux/features/auth/loginSlice';

function AdminRoute() {
  const authenticated = useSelector(thisUser);
  return authenticated.user.payload.role=='admin' ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;