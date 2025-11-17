import { IconType } from 'react-icons';
import {
  BiBell,
  BiCartAlt,
  BiChart,
  BiCog,
  BiGridAlt,
  BiLogOut,
  BiMessageAlt,
} from 'react-icons/bi';
import { IoStorefrontOutline } from 'react-icons/io5';

import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { IconButton, Logo } from '../../ui';
import { useAuth0 } from '@auth0/auth0-react';

const Aside = () => {
  const { logout } = useAuth0();

  return (
    <aside className="bg-slate-50 p-5 flex flex-col items-center gap-12">
      <div>
        <Logo />
      </div>
      <ul className="flex-1 flex flex-col gap-4">
        <AsideItem to="/dashboard" icon={BiGridAlt} />
        <AsideItem to="/dashboard/my-auctions" icon={IoStorefrontOutline} />
        <AsideItem to="" icon={BiMessageAlt} />
        <AsideItem to="" icon={BiCartAlt} />
        <AsideItem to="" icon={BiChart} />
        <AsideItem to="/notifications" icon={BiBell} />
        <AsideItem to="/settings" icon={BiCog} />
      </ul>
      <div>
        <IconButton
          size="lg"
          icon={BiLogOut}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        />
      </div>
    </aside>
  );
};

const AsideItem = ({
  to,
  icon: Icon,
}: // isActive = false,
{
  // isActive?: boolean;
  icon: IconType;
  to: string;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <li
      className={twMerge(
        ' rounded-2xl p-1.5 transition m-0',
        isActive ? 'bg-slate-800 text-slate-100' : 'text-slate-500'
      )}
    >
      <Link to={to}>
        <Icon className="m-0" size={24} />
      </Link>
    </li>
  );
};

export default Aside;
