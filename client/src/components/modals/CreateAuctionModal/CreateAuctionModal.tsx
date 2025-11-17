import { BiShapePolygon } from 'react-icons/bi';
import { ModalProps } from '../../../types';
import { Button, Modal } from '../../ui';
import { IoCalendarOutline, IoStorefrontOutline } from 'react-icons/io5';
import { useCallback, useState } from 'react';
import useRequest from '../../../hooks/useRequest';

const CreateAuctionModal = ({ isOpen, onClose }: ModalProps) => {
  const [title, setTitle] = useState('');
  const { sendRequest, isLoading } = useRequest({ endpoint: '/auctions' });

  const handleCreateAuction = useCallback(async () => {
    await sendRequest({ body: { title } });

    onClose();
  }, [onClose, sendRequest, title]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-2xl sm:p-8">
        <div className=" max-w-sm mx-auto">
          <div className="flex items-center space-x-5">
            <IoStorefrontOutline size={32} />
            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
              <h2 className="leading-relaxed">Create an Auction</h2>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div className="">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="flex flex-col">
                <label className="text-sm leading-loose">Title</label>
                <input
                  type="text"
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-2xl focus:outline-none text-gray-600"
                  placeholder="Event title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm leading-loose">Description</label>
                <textarea
                  rows={3}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-2xl focus:outline-none text-gray-600"
                  placeholder="Optional"
                ></textarea>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <label className="text-sm leading-loose">Start</label>
                  <div className="relative focus-within:text-gray-600 text-gray-400">
                    <input
                      type="date"
                      className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-2xl focus:outline-none text-gray-600"
                      placeholder="25/02/2020"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <IoCalendarOutline />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium leading-loose">
                    End
                  </label>
                  <div className="relative focus-within:text-gray-600 text-gray-400">
                    <input
                      type="date"
                      className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-2xl focus:outline-none text-gray-600"
                      placeholder="26/02/2020"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <IoCalendarOutline />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center space-x-4">
              <Button
                disabled={isLoading}
                variant="outlined"
                expanded
                onClick={() => onClose()}
              >
                <span>Cancel</span>
              </Button>
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                expanded
                onClick={handleCreateAuction}
              >
                <span>Create</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAuctionModal;
