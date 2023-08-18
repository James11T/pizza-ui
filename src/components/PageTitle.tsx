import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"h2"> {
  children?: string;
}

const PageTitle = ({ children, ...h2Props }: Props) => {
  return (
    <h2 className="font-raleway ml-1 text-2xl" {...h2Props}>
      {children}
    </h2>
  );
};

export default PageTitle;
