import { IconType } from 'react-icons';
import { Size, Variant } from '../../../types';
import { twMerge } from 'tailwind-merge';

const SIZE = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const ICON_SIZE = {
  sm: 16,
  md: 18,
  lg: 24,
};

type Props = {
  icon: IconType;
  variant?: Variant;
  size?: Size;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

const IconButton = ({
  icon: Icon,
  size = 'md',
  variant = 'primary',
  onClick,
  className,
}: Props) => {
  const VARIANT: { [key: string]: string } = {
    primary: 'bg-indigo-700 text-indigo-50',
    secondary: '',
    flat: '',
    outlined: 'border-slate-300',
  };

  return (
    <button
      className={twMerge(
        'rounded-full flex justify-center items-center border cursor-pointer transition',
        SIZE[size],
        VARIANT[variant],
        className
      )}
      onClick={onClick}
    >
      <Icon size={ICON_SIZE[size]} />
    </button>
  );
};

export default IconButton;
