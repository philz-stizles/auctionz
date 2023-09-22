import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Button, Logo } from '../../ui';
import { Container } from '..';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  console.log(user);
  return (
    <nav className="py-4">
      <Container fluid className="flex justify-between items-center">
        <Logo />
        <ul className='flex items-center gap-8 font-medium'>
          <li>
            <NavLink to="">Auctions</NavLink>
          </li>
          <li>
            <NavLink to="">Buy Now</NavLink>
          </li>
          <li>
            <NavLink to="">Private Sales</NavLink>
          </li>
          <li>
            <NavLink to="">Sell</NavLink>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button onClick={() => logout()}>Log out</Button>
              <Link to="/dashboard">
                <Avatar src={user?.picture} />
              </Link>
            </>
          ) : (
            <Button onClick={() => loginWithRedirect()}>Log in</Button>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
