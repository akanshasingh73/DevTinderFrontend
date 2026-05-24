import { addUser, removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import { PUBLIC_ROUTES } from '../utils/constant';
import { getUserProfile } from '../services/userService';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) return;
    if (user) return;

    const fetchUser = async () => {
      try {
        const { data } = await getUserProfile();
        dispatch(addUser(data));
      } catch {
        dispatch(removeUser());
      }
    };

    fetchUser();
  }, [pathname]); 

  return { user, isLoading };
};

export default useAuth;
