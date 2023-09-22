import { withAuthenticationRequired } from '@auth0/auth0-react';
import { PageLoader } from '../components/shared';

type Props = {
  component: React.ComponentType<object>;
};

const AuthGuard = ({ component }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};

export default AuthGuard;
