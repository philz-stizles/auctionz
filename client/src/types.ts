export type Variant = 'primary' | 'secondary' | 'flat' | 'outlined' | 'link';
export type Size = 'sm' | 'md' | 'lg';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};