import PageTitle from "../components/PageTitle";
import Pizza from "../components/Pizza";
import {
  TrashIcon,
  PencilIcon,
  FaceFrownIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { UsePizzaBasket } from "../hooks/usePizzaBasket";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import cn from "clsx";
import { toast } from "react-toastify";
import useRoute from "../hooks/useRoute";
import { presetIdMap } from "../data";
import PizzaSrc from "../assets/pizza.svg";
import { Order } from "../types";
import ToppingDiff from "../components/ToppingDiff";

interface Props {
  basket: UsePizzaBasket;
  builder: UsePizzaBuilder;
  onSubmit: (order: Omit<Order, "uuid" | "status">) => void;
}

const basketItemButtonClasses =
  "grid w-14 place-content-center shadow-lg [&>svg]:w-7 [&>svg]:opacity-50 hover:brightness-95 active:brightness-90";

const bottomButtonClasses =
  "flex-grow rounded-md flex justify-center items-center text-lg [&>svg]:w-6 [&>svg]:h-6 gap-1 font-semibold disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed filter hover:brightness-95 active:brightness-90";

const BasketPage = ({ basket, builder, onSubmit }: Props) => {
  const { navigate } = useRoute();

  const basketEmpty = (
    <>
      <FaceFrownIcon className="h-16 w-16 stroke-2" />
      <div>
        It looks like your basket is empty, take a look at our menu{" "}
        <button onClick={() => navigate("HOME")} className="underline">
          here
        </button>
        .
      </div>
    </>
  );

  const onEditPizza = (index: number) => {
    const preset = basket.contents[index];

    builder.setPreset(preset);
    basket.remove(index);

    navigate("BUILDER");
  };

  const handleBasketRemove = (index: number) => {
    basket.remove(index);
    toast("Removed from basket");
  };

  const handleOrderSubmit = () => {
    basket.clear();
    onSubmit({
      pizzas: basket.contents.map((content) => ({
        preset_id: content.id,
        toppings: content.toppings,
      })),
    });
  };

  return (
    <>
      <div className="flex h-auto flex-col">
        <div className="flex-grow p-2 pb-20">
          <PageTitle>Basket</PageTitle>
          <ul className="flex flex-col gap-2">
            {basket.contents.map((pizza, index) => (
              <li key={index} className="flex gap-2">
                <Pizza
                  img={pizza.image}
                  title={pizza.name}
                  className="w-full"
                  description={
                    <ToppingDiff
                      originalToppings={presetIdMap[pizza.id].toppings}
                      newToppings={pizza.toppings}
                    />
                  }
                />
                <div className="flex flex-col pt-2 [&>*]:basis-full">
                  <button
                    className={cn(
                      basketItemButtonClasses,
                      "rounded-t-lg bg-indigo-300"
                    )}
                    onClick={() => onEditPizza(index)}
                  >
                    <PencilIcon />
                  </button>
                  <button
                    className={cn(
                      basketItemButtonClasses,
                      "rounded-b-lg bg-rose-400"
                    )}
                    onClick={() => handleBasketRemove(index)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-muted flex flex-col items-center gap-2 p-4 text-center text-xl">
            {basket.contents.length === 0 ? (
              basketEmpty
            ) : (
              <div>
                Got room for more? Go back to the menu{" "}
                <button onClick={() => navigate("HOME")} className="underline">
                  here
                </button>
                .
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 h-20 w-full gap-2 border-t-[1px] bg-white p-2">
        <div className="ml-auto flex h-full gap-2">
          <button
            className={cn(
              bottomButtonClasses,
              "flex basis-1/3 items-center gap-2 bg-gray-200 text-gray-800"
            )}
            onClick={() => navigate("HOME")}
          >
            <BookOpenIcon />
            <span>Menu</span>
          </button>
          <button
            className={cn(
              bottomButtonClasses,
              "bg-confirm flex basis-2/3 items-center gap-2 text-lime-950"
            )}
            disabled={basket.contents.length === 0}
            onClick={handleOrderSubmit}
          >
            <img src={PizzaSrc} className="h-6 w-6" />
            <span>Submit Order</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketPage;
