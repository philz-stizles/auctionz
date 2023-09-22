import { BiDirections, BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import { AuctionCard } from '../../components/cards';
import { Heading, IconButton } from '../../components/ui';
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth0();
  const { data } = useFetch({ endpoint: '/auctions', isAuth: true, init: [] });

  console.log('data: ', data);

  if (!user) {
    return null;
  }

  const auctions: { id: number }[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ];

  return (
    <>
      <div className="mb-8">
        <Heading title="Category" />

        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-200">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2 first-of-type:-ml-4">
              <Link
                to="#"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              >
                Profile
              </Link>
            </li>
            <li className="mr-2">
              <Link
                to="#"
                className="inline-block px-4 py-2 text-indigo-600 border-b-2 border-indigo-600 rounded-t-lg active dark:text-indigo-500 dark:border-indigo-500"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
            <li className="mr-2">
              <Link
                to="#"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              >
                Settings
              </Link>
            </li>
            <li className="mr-2">
              <Link
                to="#"
                className="inline-block px-4 py-2 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              >
                Contacts
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center mb-2">
          <Heading title="Live Auctions" />
          <div className="flex gap-2">
            <IconButton size="sm" variant="outlined" icon={BiLeftArrowAlt} />
            <IconButton size="sm" icon={BiRightArrowAlt} />
          </div>
        </div>
        {auctions.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="flex flex-col justify-center items-center">
              <BiDirections size={32} />
              <h3 className="font-semibold text-base">No auctions</h3>
              <p className="">Get started by creating a new project.</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-4 gap-y-8 border-t border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {auctions.map((item) => (
              <AuctionCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
