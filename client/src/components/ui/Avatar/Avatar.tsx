type Props = {
  src?: string;
};

const Avatar = ({ src }: Props) => {
  return <img className="rounded-full w-8 h-8" src={src} alt="Avatar" />;
};

export default Avatar;
