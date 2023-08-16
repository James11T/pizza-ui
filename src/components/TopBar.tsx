import Basket from "./icons/Basket";
import pizza from "../assets/pizza.svg";
import { Link } from "react-router-dom";

interface Props {
  basketCount: number;
}

const TopBar = ({ basketCount }: Props) => {
  return (
    <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center bg-white px-3 py-2 shadow-md">
      <Link className="flex flex-grow gap-1" to="/">
        <img src={pizza} alt="pizza logo" className="h-9 w-9" />
        <div className="font-raleway font-se flex flex-col justify-center whitespace-nowrap text-2xl">
          {import.meta.env.VITE_BRAND_NAME}
        </div>
      </Link>
      <Link className="relative" to="/basket">
        <Basket className="h-9 w-9 text-stone-700" />
        <span className="font-raleway absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[4px] text-xs font-bold">
          {basketCount}
        </span>
      </Link>
    </div>
  );
};

export default TopBar;
