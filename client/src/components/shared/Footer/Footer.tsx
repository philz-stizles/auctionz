import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoYoutube,
} from 'react-icons/bi';
import { Logo } from '../../ui';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-24" aria-labelledby="footer-heading">
      <Container>
        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm leading-6 pr-6">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex items-center gap-4">
              <Link to="#" className="axr bkw">
                <BiLogoFacebook size={18} />
              </Link>
              <Link to="#" className="axr bkw">
                <BiLogoInstagram size={18} />
              </Link>
              <Link to="#" className="axr bkw">
                <BiLogoTwitter size={18} />
              </Link>

              <Link to="#" className="axr bkw">
                <BiLogoYoutube size={18} />
              </Link>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-8">
            <div className="grid grid-cols-2 gap-8">
              <Menu
                title="Solutions"
                items={[
                  { label: 'Marketing', to: '' },
                  { label: 'Analytics', to: '' },
                  { label: 'Commerce', to: '' },
                  { label: 'Insights', to: '' },
                ]}
              />
              <Menu
                title="Support"
                items={[
                  { label: 'Pricing', to: '' },
                  { label: 'Documentation', to: '' },
                  { label: 'Guides', to: '' },
                  { label: 'API Status', to: '' },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <Menu
                title="Company"
                items={[
                  { label: 'About', to: '' },
                  { label: 'Blog', to: '' },
                  { label: 'Jobs', to: '' },
                  { label: 'Press', to: '' },
                ]}
              />
              <Menu
                title="Legal"
                items={[
                  { label: 'Claim', to: '' },
                  { label: 'Privacy', to: '' },
                  { label: 'Terms', to: '' },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="mt-10 py-4 border-t border-slate-200">
          <p className="text-xs leading-5">
            © 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

type MenuItemProps = { label: string; to: string };

const Menu = ({ title, items }: { title: string; items: MenuItemProps[] }) => {
  return (
    <div>
      <h3 className="text-sm leading-6 font-semibold">{title}</h3>
      <ul className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <MenuItem key={item.label} item={item} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ item: { label, to } }: { item: MenuItemProps }) => {
  return (
    <li>
      <Link to={to} className="text-sm leading-6">
        {label}
      </Link>
    </li>
  );
};

export default Footer;
