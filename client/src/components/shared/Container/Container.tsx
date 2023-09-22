import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
};

const Container = ({ children, className, fluid = false }: Props) => {
  return (
    <div
      className={twMerge(
        'mx-auto px-6 md:px-0',
        className,
        fluid ? 'w-11/12' : 'w-10/12'
      )}
    >
      {children}
    </div>
  );
};

export default Container;
