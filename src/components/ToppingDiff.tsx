import { arrayDiff } from "../array";
import { toppingIdMap } from "../data";

interface ToppingDiffProps {
  originalToppings: string[];
  newToppings: string[];
}

const ToppingDiff = ({ originalToppings, newToppings }: ToppingDiffProps) => {
  const [addedToppings, removedToppings] = arrayDiff(
    originalToppings,
    newToppings
  );

  if (addedToppings.length + removedToppings.length === 0) {
    return <span className="text-gray-500">No alterations</span>;
  }

  return (
    <ul>
      {addedToppings.map((topping) => (
        <li className="text-green-600" key={`add_${topping}`}>
          + {toppingIdMap[topping].name}
        </li>
      ))}
      {removedToppings.map((topping) => (
        <li className="text-rose-700" key={`remove_${topping}`}>
          - {toppingIdMap[topping].name}
        </li>
      ))}
    </ul>
  );
};

export default ToppingDiff;
