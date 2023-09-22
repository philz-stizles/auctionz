const Heading = ({ title, subTitle }: { title: string; subTitle?: string }) => {
  return <h3 className="text-lg font-bold">{title}</h3>;
};

export default Heading;
