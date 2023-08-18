import { categoryToppingsMap, categoryIdNameMap, categoryIdMap } from "../data";
import cn from "clsx";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface PizzaBuilderProps {
  selectedToppings?: string[];
  onToppingClicked: (toppingId: string) => void;
}

const PizzaBuilder = ({
  selectedToppings = [],
  onToppingClicked,
}: PizzaBuilderProps) => {
  return (
    <div>
      {Object.entries(categoryToppingsMap).map(([category, toppings]) => (
        <div key={category}>
          <div className="border-y-[1px] border-stone-300 bg-stone-200 p-2 font-semibold">
            {categoryIdNameMap[category]}
            {categoryIdMap[category].mutuallyExclusive && (
              <span className="text-muted ml-1 text-xs">(pick one)</span>
            )}
          </div>
          <ul>
            {toppings.map((topping) => (
              <li
                className="border-b-[1px] border-stone-100 [&:last-child]:border-b-0"
                key={topping.id}
              >
                <button
                  className={cn(
                    "relative flex w-full items-center justify-between bg-white px-4 py-3 text-left filter",
                    topping.inStock
                      ? "hover:brightness-95 active:brightness-90"
                      : "text-muted cursor-not-allowed line-through",
                    selectedToppings.includes(topping.id) ? "font-semibold" : ""
                  )}
                  title={!topping.inStock ? "Out Of Stock" : ""}
                  onClick={() => onToppingClicked(topping.id)}
                  disabled={!topping.inStock}
                >
                  <div
                    className={cn(
                      "duration-50 bg-confirm opacity-1 absolute bottom-0 left-0 top-0 w-2",
                      !selectedToppings.includes(topping.id) && "opacity-0"
                    )}
                  ></div>
                  {topping.name}
                  {selectedToppings.includes(topping.id) ? (
                    <MinusIcon className="h-5 w-5" />
                  ) : (
                    <PlusIcon className="h-5 w-5" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PizzaBuilder;
