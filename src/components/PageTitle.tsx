interface Props {
  children?: string;
}

const PageTitle = ({ children }: Props) => {
  return <h2 className="font-raleway ml-1 text-2xl">{children}</h2>;
};

export default PageTitle;
