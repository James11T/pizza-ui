import ActionButton from "../components/ActionButton";
import PageTitle from "../components/PageTitle";
import Pizza from "../components/Pizza";
import Delete from "../components/icons/Delete";
import Edit from "../components/icons/Edit";
import Sad from "../components/icons/Sad";
import PizzaIcon from "../components/icons/Pizza";
import { UsePizzaBasket } from "../hooks/usePizzaBasket";
import { Link, useNavigate } from "react-router-dom";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import cn from "clsx";
import { toast } from "react-toastify";

interface Props {
  basket: UsePizzaBasket;
  builder: UsePizzaBuilder;
}

const basketEmpty = (
  <>
    <Sad className="h-16 w-16 stroke-2" />
    <div>
      It looks like your basket is empty, take a look at our menu{" "}
      <Link to="/" className="underline">
        here
      </Link>
      .
    </div>
  </>
);

const bottomButtonClasses =
  "flex-grow rounded-md flex justify-center items-center text-lg [&>svg]:w-6 [&>svg]:h-6 gap-1 font-semibold disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed filter hover:brightness-95 active:brightness-90";

const BasketPage = ({ basket, builder }: Props) => {
  const navigate = useNavigate();

  const onEditPizza = (index: number) => {
    const preset = basket.contents[index];

    builder.setPreset(preset);
    basket.remove(index);

    navigate("/builder?edit");
  };

  const onBasketClear = () => {
    basket.clear();
    navigate("/");
    toast("Cleared basket");
  };

  const handleBasketRemove = (index: number) => {
    basket.remove(index);
    toast("Removed from basket");
  };

  return (
    <>
      <div className="mx-auto flex h-auto max-w-[1200px] flex-col">
        <div className="flex-grow p-2 pb-20">
          <PageTitle>Basket</PageTitle>
          <ul className="flex flex-col gap-2">
            {basket.contents.map((pizza, index) => (
              <li key={index}>
                <Pizza
                  img={pizza.image}
                  toppings={pizza.toppings}
                  title={pizza.name}
                  allowGrowth={true}
                  actions={
                    <>
                      <ActionButton
                        icon={<Edit />}
                        text="CHANGE"
                        className="bg-gray-100"
                        onClick={() => onEditPizza(index)}
                      />
                      <ActionButton
                        icon={<Delete />}
                        text="REMOVE"
                        className="bg-remove"
                        onClick={() => handleBasketRemove(index)}
                      />
                    </>
                  }
                />
              </li>
            ))}
          </ul>
          <div className="text-muted flex flex-col items-center gap-2 p-4 text-center text-xl">
            {basket.contents.length === 0 ? (
              basketEmpty
            ) : (
              <div>
                Got room for more? Go back to the menu{" "}
                <Link to="/" className="underline">
                  here
                </Link>
                .
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 h-20 w-full border-t-[1px] bg-white p-2">
        <div className="mx-auto ml-auto flex h-full max-w-[1200px] gap-2">
          <button
            className={cn(
              bottomButtonClasses,
              "basis-1/3 bg-gray-100 text-gray-800"
            )}
            disabled={basket.contents.length === 0}
            onClick={onBasketClear}
          >
            <Delete />
            CANCEL
          </button>
          <button
            className={cn(
              bottomButtonClasses,
              "bg-confirm basis-2/3 text-lime-950"
            )}
            disabled={basket.contents.length === 0}
          >
            <PizzaIcon className="" />
            SUBMIT ORDER
          </button>
        </div>
      </div>
    </>
  );
};

export default BasketPage;
