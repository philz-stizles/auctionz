import { ModalProps } from '../../../types';

type Props = ModalProps & {
  children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-80 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full"
    >
      <div className="flex flex-col justify-center">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          {/* Modal body */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
