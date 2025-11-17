import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link
      to="/"
      className={twMerge('logo text-2xl text-slate-50 font-semibold', className)}
    >
      Auctionz
    </Link>
    // <Link
    //   to="/"
    //   className={twMerge(
    //     'logo rounded-md p-1 flex justify-center items-center bg-indigo-700 text-indigo-100 w-10 h-10',
    //     className
    //   )}
    // >

    //   <BiRecycle size={24} />
    // </Link>
  );
};

export default Logo;
