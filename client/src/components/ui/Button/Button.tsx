import { twMerge } from 'tailwind-merge';
import { Size, Variant } from '../../../types';

const SIZE = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-lg',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  //   as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  variant?: Variant;
  expanded?: boolean;
  size?: Size;
}

const Button: React.FC<ButtonProps> = ({
  //   as: Component = 'button',
  children,
  isLoading = false,
  disabled,
  className,
  variant = 'primary',
  expanded = false,
  type = 'button',
  size = 'md',
  ...rest
}) => {
  const VARIANT: { [key: string]: string } = {
    primary: 'bg-indigo-600 text-indigo-50',
    secondary:
      'bg-white text-slate-900 hover:bg-indigo-50 active:bg-indigo-200 active:text-slate-600 focus-visible:outline-white',
    flat: '',
    outlined: 'border-indigo-600',
  };

  return (
    <button
      type={type}
      className={twMerge(
        'group px-4 py-2 inline-flex justify-center items-center rounded-full border border-transparent cursor-pointer font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
        SIZE[size],
        VARIANT[variant],
        expanded && 'w-full'
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </button>
  );
  //   return (
  //     <Component className="" disabled={disabled || isLoading} {...rest}>
  //       {children}
  //     </Component>
  //   );
};

export default Button;
