import Footer from '../organisms/Footer';
import NavBar from '../organisms/NavBar';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MainLayout = () => {
  useAuth(); // handles fetch + redux dispatch

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
