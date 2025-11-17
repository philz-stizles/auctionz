import { BiDirections, BiLeftArrowAlt, BiNetworkChart, BiRightArrowAlt } from 'react-icons/bi';
import { AuctionCard } from '../../components/cards';
import { Heading, IconButton } from '../../components/ui';
import { useAuth0 } from '@auth0/auth0-react';
import useFetch from '../../hooks/useFetch';
import { IoAddOutline } from 'react-icons/io5';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateAuctionModal from '../../components/modals/CreateAuctionModal/CreateAuctionModal';

const MyAuctions = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useAuth0();
  const { data: auctions, error, isLoading } = useFetch<{ id: string }[]>({
    init: [],
    endpoint: '/auctions',
    isAuth: true,
  });

  if (!user) {
    return null;
  }
  return (
    <div className="relative flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <Heading title="My Auctions" />
        <div className="flex gap-2">
          <IconButton size="sm" variant="outlined" icon={BiLeftArrowAlt} />
          <IconButton size="sm" icon={BiRightArrowAlt} />
        </div>
      </div>
      {error && (
        <div className="flex-1 flex justify-center items-center -translate-y-3.5 py-8">
          <div className="flex flex-col justify-center items-center">
            <BiNetworkChart size={32} />
            <h3 className="font-semibold text-base">No Network</h3>
            <p className="">Check your network connection.</p>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center -translate-y-3.5 py-8">
          Loading ...
        </div>
      ) : auctions.length === 0 ? (
        <div className="flex-1 flex justify-center items-center -translate-y-3.5 py-8">
          <div className="flex flex-col justify-center items-center">
            <BiDirections size={32} />
            <h3 className="font-semibold text-base">No auctions</h3>
            <p className="">Get started by creating a new project.</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {auctions.map((item) => (
            <AuctionCard key={item.id} data={item} hasHeader={false} />
          ))}
        </div>
      )}
      <IconButton
        size="lg"
        className="absolute right-0 bottom-0"
        icon={IoAddOutline}
        onClick={() => setModalIsOpen(true)}
      />
      {modalIsOpen &&
        createPortal(
          <CreateAuctionModal
            isOpen={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
          />,
          document.getElementById('modal')!
        )}
    </div>
  );
};

export default MyAuctions;
