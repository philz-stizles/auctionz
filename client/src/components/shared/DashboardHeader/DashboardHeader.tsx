import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '../../ui';

const DashboardHeader = () => {
  const { user } = useAuth0();
  return (
    <div className="flex justify-between items-start px-8 py-4">
      <div>
        <h2 className="text-2xl font-bold">Good morning, {user?.name}!</h2>

        <p className="text-sm text-slate-500">Discover Rare Items on Auction</p>
      </div>
      <div>
        <Avatar src={user?.picture} />
      </div>
    </div>
  );
};

export default DashboardHeader;
