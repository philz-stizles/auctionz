import { BiSolidHeart } from 'react-icons/bi';
import { Avatar } from '../../ui';

type Props = {
  hasHeader?: boolean;
  data?: object;
};

const AuctionCard = ({ data, hasHeader = true }: Props) => {
  return (
    <article className="p-4 flex max-w-xl flex-col justify-between gap-4 rounded-2xl shadow-slate-400 transition ease-in-out duration-300 hover:bg-white hover:shadow-lg cursor-pointer">
      {hasHeader && (
        <div className="relative flex flex-row items-center justify-between gap-x-4">
          <div className="flex items-center gap-2 px-2">
            <Avatar src="https://i.pravatar.cc/300" />
            <p className="text-sm font-bold text-gray-900">Michael Foster</p>
          </div>
          <div>
            <BiSolidHeart className="text-rose-600" size={18} />
          </div>
        </div>
      )}
      <img
        className="rounded-2xl shadow-lg shadow-slate-200 object-contain scale-105"
        src="/images/pexels-prime.jpg"
        alt="Auction"
      />
      <div className="flex justify-between items-center gap-x-4 text-xs">
        <div className="flex flex-col justify-between items-start">
          <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            High Alpine Land Cruiser
          </h3>
          <span className="text-gray-500">Working condition</span>
        </div>
        <div className="flex flex-col justify-between items-end">
          <span className="text-gray-500">Current Bid</span>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            $23.07
          </h3>
        </div>
      </div>
    </article>
  );
};

export default AuctionCard;
