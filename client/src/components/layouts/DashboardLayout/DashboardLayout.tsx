import { Outlet } from 'react-router-dom';
import { Aside, DashboardHeader } from '../../shared';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className='p-8 flex-1 flex flex-col'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
