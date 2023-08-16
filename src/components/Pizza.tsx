import React from "react";
import cn from "clsx";
import { toppingIdMap } from "../data";
import pizza from "../assets/pizza.svg";

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, "children"> {
  img?: string;
  toppings?: string[];
  title?: string;
  description?: string;
  allowGrowth?: boolean;
  actions?: React.ReactNode;
}

const Pizza = ({
  img = pizza,
  toppings = [],
  title,
  description,
  allowGrowth = true,
  className,
  actions,
  ...divProps
}: Props) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md bg-white shadow-md shadow-slate-300",
        className
      )}
      {...divProps}
    >
      <div className=""></div>
      {/* <div className="">{actions}</div> */}
    </div>
  );
};

export default Pizza;
export type { Props };
