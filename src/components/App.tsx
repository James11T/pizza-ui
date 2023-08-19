import TopBar from "./TopBar";
import usePizzaBuilder from "../hooks/usePizzaBuilder";
import HomePage from "../pages/Home";
import BuilderPage from "../pages/Builder";
import usePizzaBasket from "../hooks/usePizzaBasket";
import BasketPage from "../pages/Basket";
import OrderPage from "../pages/Order";
import { ToastContainer } from "react-toastify";
import cn from "clsx";
import useRoute from "../hooks/useRoute";
import usePizzaOrder from "../hooks/usePizzaOrder";
import ControlPanel from "../pages/ControlPanel";

const App = () => {
  const builder = usePizzaBuilder();
  const basket = usePizzaBasket();
  const order = usePizzaOrder();
  const { navigate, emblaRef } = useRoute();

  if (window.location.pathname === "/control-panel") {
    return (
      <>
        <TopBar navigationDisabled={true} />
        <div className="mx-auto max-w-[1000px] overflow-hidden p-2 pt-14">
          <ControlPanel />
        </div>
      </>
    );
  }

  if (order.order && order.order.status !== "DONE") {
    navigate("ORDER");
  }

  return (
    <>
      <TopBar navigationDisabled={order.activeOrder} />
      <div className="mx-auto max-w-[1000px] overflow-hidden" ref={emblaRef}>
        <div className="flex">
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <HomePage builder={builder} />
          </div>
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <BuilderPage builder={builder} basket={basket} />
          </div>
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <BasketPage
              builder={builder}
              basket={basket}
              onSubmit={order.submitOrder}
            />
          </div>
          <div className={cn("embla__slide", "mx-auto h-auto max-w-[1000px]")}>
            <OrderPage order={order} />
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
