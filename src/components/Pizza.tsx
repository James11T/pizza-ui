import React, { ElementRef } from "react";
import cn from "clsx";
import pizza from "../assets/pizza.svg";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { toppingIdMap } from "../data";

interface Props
  extends Omit<React.ComponentPropsWithoutRef<"button">, "children"> {
  img?: string;
  toppings?: string[];
  title?: string;
  description?: React.ReactNode;
  actions?: boolean;
  onClick?: () => void;
}

const Pizza = ({
  img = pizza,
  toppings,
  title,
  description,
  className,
  onClick,
  ...buttonProps
}: Props) => {
  const scrollableRef = React.useRef<ElementRef<"div">>(null);
  const [showScrollIndicator, setShowScrollIndicator] = React.useState(true);

  React.useEffect(() => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;
    if (scrollable.scrollHeight === scrollable.clientHeight)
      return setShowScrollIndicator(false);

    const handleScroll = () => {
      setShowScrollIndicator(scrollable.scrollTop <= 0);
    };

    scrollable.addEventListener("scroll", handleScroll);

    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef]);

  return (
    <button
      className={cn(
        "relative mt-2 flex rounded-lg bg-white text-left shadow-md shadow-slate-300",
        onClick &&
          "hover:bg-gray-50 active:bg-gray-100 [&>div>img]:hover:scale-105",
        className,
        !onClick && "pr-2"
      )}
      {...buttonProps}
      onClick={onClick}
    >
      <div className="mr-1 flex-grow p-2 text-sm">
        <h2 className="white text-lg font-semibold">{title}</h2>
        <div className="relative h-20 overflow-y-scroll" ref={scrollableRef}>
          {toppings ? (
            <ul>
              {toppings.map((topping) => (
                <li key={topping}>{toppingIdMap[topping].name}</li>
              ))}
            </ul>
          ) : (
            <div>{description}</div>
          )}
          {showScrollIndicator && (
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-gray-200 px-4 opacity-80">
              <ChevronDownIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 p-2 pr-0">
        <img
          src={img}
          alt="photo of pizza"
          className="-mt-4 aspect-square w-28 rounded-full bg-white object-cover shadow-gray-500 transition-transform"
        />
      </div>
      <div className="flex flex-shrink-0 items-center self-stretch">
        {onClick && <ChevronRightIcon className="h-8 w-8 text-gray-600" />}
      </div>
    </button>
  );
};

export default Pizza;
export type { Props };
