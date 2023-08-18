import TopBar from "./TopBar";
import usePizzaBuilder from "../hooks/usePizzaBuilder";
import HomePage from "../pages/Home";
import BuilderPage from "../pages/Builder";
import usePizzaBasket from "../hooks/usePizzaBasket";
import BasketPage from "../pages/Basket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cn from "clsx";
import useRoute from "../hooks/useRoute";

const App = () => {
  const builder = usePizzaBuilder();
  const basket = usePizzaBasket();

  const { emblaRef } = useRoute();

  return (
    <>
      <TopBar />
      <div className="mx-auto max-w-[1000px] overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <HomePage builder={builder} />
          </div>
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <BuilderPage builder={builder} basket={basket} />
          </div>
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <BasketPage builder={builder} basket={basket} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        autoClose={2000}
        closeOnClick
      />
    </>
  );
};

export default App;
