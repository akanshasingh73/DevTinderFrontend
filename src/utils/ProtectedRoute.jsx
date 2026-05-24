import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useSelector((state) => state.user);

  // Wait for auth check to complete before deciding what to render 
  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <span className='loading loading-spinner loading-lg' />
      </div>
    );
  }

  return user ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
