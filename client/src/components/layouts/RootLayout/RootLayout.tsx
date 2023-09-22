import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../../shared';

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
