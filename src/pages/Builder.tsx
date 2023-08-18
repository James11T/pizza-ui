import PizzaBuilder from "../components/PizzaBuilder";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import { UsePizzaBasket } from "../hooks/usePizzaBasket";
import { toast } from "react-toastify";
import useRoute from "../hooks/useRoute";
import { TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import cn from "clsx";

interface Props {
  builder: UsePizzaBuilder;
  basket: UsePizzaBasket;
}

const bottomButtonClasses =
  "rounded-lg flex gap-2 items-center p-2 font-semibold text-lg justify-center";

const BuilderPage = ({ builder, basket }: Props) => {
  const { navigate } = useRoute();

  const isEditing = false; // TODO FIX
  // const isEditing = searchParams.get("edit") !== null;

  const onAddToBasket = () => {
    basket.add(builder.preset);
    navigate("BASKET");
    isEditing ? toast("Changed saved") : toast("Added to basket");
  };

  return (
    <div className="mx-auto max-w-[1200px] pb-16 pt-2">
      <PizzaBuilder
        selectedToppings={builder.preset.toppings}
        onToppingClicked={builder.toggleTopping}
      />
      <div className="fixed bottom-0 flex h-16 w-full gap-2 border-t-[1px] bg-white p-2">
        <button
          className={cn(
            bottomButtonClasses,
            "bg-remove basis-1/3 text-red-950"
          )}
          onClick={() => navigate("HOME")}
        >
          <TrashIcon className="h-6 w-6" />
          Cancel
        </button>
        <button
          className={cn(
            bottomButtonClasses,
            "bg-confirm basis-2/3 text-green-950"
          )}
          onClick={onAddToBasket}
        >
          <PlusIcon className="h-6 w-6" />
          Add To Basket
        </button>
      </div>
    </div>
  );
};

export default BuilderPage;
export type { Props };
