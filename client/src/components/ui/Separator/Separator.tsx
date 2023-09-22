import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type Orientation = 'horizontal' | 'vertical';

type Props = {
  className?: string;
  orientation?: Orientation;
  decorative?: boolean;
};

const Separator = React.forwardRef(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      ...props
    }: Props,
    ref
  ) => {
    return (
      <div
        className={twMerge(
          'shrink-0 bg-border h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
      ></div>
    );
  }
);

export default Separator;
