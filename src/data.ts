import inventory from "./assets/inventory.json";
import { Topping, ToppingCategory, ToppingPreset } from "./types";

const categoryToppingsMap: Record<ToppingCategory["id"], Topping[]> =
  Object.fromEntries(
    inventory.toppingCategories.map(({ id }) => [
      id,
      inventory.toppings.filter((topping) => topping.category === id),
    ])
  );

const categoryIdNameMap: Record<
  ToppingCategory["id"],
  ToppingCategory["name"]
> = inventory.toppingCategories.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr.name }),
  {}
);

const toppingIdMap: Record<Topping["id"], Topping> = inventory.toppings.reduce(
  (prev, curr) => ({ ...prev, [curr.id]: curr }),
  {}
);

const categoryIdMap: Record<ToppingCategory["id"], ToppingCategory> =
  inventory.toppingCategories.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }),
    {}
  );

const presetIdMap: Record<ToppingPreset["id"], ToppingPreset> =
  inventory.presets.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

export {
  inventory,
  categoryToppingsMap,
  categoryIdNameMap,
  toppingIdMap,
  categoryIdMap,
  presetIdMap,
};
