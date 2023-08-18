import { BookOpenIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import pizza from "../assets/pizza.svg";
import useRoute from "../hooks/useRoute";

const TopBar = () => {
  const { navigate } = useRoute();

  return (
    <div className="fixed left-1/2 top-0 z-30 flex h-14 w-full max-w-[1000px] -translate-x-1/2 items-center gap-2 bg-gray-100 px-3 py-2">
      <button className="flex flex-grow gap-1" onClick={() => navigate("HOME")}>
        <img src={pizza} alt="pizza logo" className="h-9 w-9" />
        <div className="font-raleway font-se flex flex-col justify-center whitespace-nowrap text-2xl">
          {import.meta.env.VITE_BRAND_NAME}
        </div>
      </button>
      <button onClick={() => navigate("HOME")}>
        <BookOpenIcon className="h-8 w-8 text-stone-700" />
      </button>
      <button onClick={() => navigate("BASKET")}>
        <ShoppingCartIcon className="h-8 w-8 text-stone-700" />
      </button>
    </div>
  );
};

export default TopBar;
