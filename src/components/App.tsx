import TopBar from "./TopBar";
import usePizzaBuilder from "../hooks/usePizzaBuilder";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import BuilderPage from "../pages/Builder";
import usePizzaBasket from "../hooks/usePizzaBasket";
import BasketPage from "../pages/Basket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const builder = usePizzaBuilder();
  const basket = usePizzaBasket();

  return (
    <BrowserRouter>
      <TopBar basketCount={basket.contents.length} />
      <div className="mx-auto h-auto pt-14">
        <Routes>
          <Route
            index
            element={<HomePage builder={builder} basket={basket} />}
          />
          <Route
            path="builder"
            element={<BuilderPage builder={builder} basket={basket} />}
          />
          <Route
            path="basket"
            element={<BasketPage builder={builder} basket={basket} />}
          />
        </Routes>
      </div>
      <ToastContainer position="top-center" hideProgressBar autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
