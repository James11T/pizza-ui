import React from "react";
import { categoryIdMap, inventory, presetIdMap, toppingIdMap } from "../data";
import { Topping, ToppingPreset } from "../types";

interface UsePizzaBuilder {
  preset: ToppingPreset;
  setPreset: (preset: ToppingPreset) => void;
  addTopping: (toppingId: Topping["id"]) => void;
  removeTopping: (toppingId: Topping["id"]) => void;
  toggleTopping: (toppingId: Topping["id"]) => void;
  loadPreset: (preset: ToppingPreset["id"] | ToppingPreset) => void;
}

const toppingSorter = (a: Topping["id"], b: Topping["id"]) =>
  categoryIdMap[toppingIdMap[a].category].order -
  categoryIdMap[toppingIdMap[b].category].order;

const addToppingRemoveConflicts = (
  toppings: Topping["id"][],
  toppingId: Topping["id"]
) =>
  [...toppings, toppingId].filter(
    (newTopping) => !toppingIdMap[toppingId].conflicts.includes(newTopping)
  );

const usePizzaBuilder = (): UsePizzaBuilder => {
  const [preset, setPreset] = React.useState<UsePizzaBuilder["preset"]>(
    inventory.presets[0]
  );

  const addTopping: UsePizzaBuilder["addTopping"] = React.useCallback(
    (toppingId) =>
      setPreset((old) => ({
        ...old,
        toppings: addToppingRemoveConflicts(old.toppings, toppingId).sort(
          toppingSorter
        ),
      })),
    []
  );

  const removeTopping: UsePizzaBuilder["removeTopping"] = React.useCallback(
    (toppingId) => {
      setPreset((old) => ({
        ...old,
        toppings: old.toppings.filter((topping) => topping !== toppingId),
      }));
    },
    []
  );

  const toggleTopping: UsePizzaBuilder["toggleTopping"] = React.useCallback(
    (toppingId) =>
      setPreset((old) => {
        if (old.toppings.includes(toppingId)) {
          return {
            ...old,
            toppings: old.toppings.filter((value) => value !== toppingId),
          };
        } else {
          return {
            ...old,
            toppings: addToppingRemoveConflicts(old.toppings, toppingId).sort(
              toppingSorter
            ),
          };
        }
      }),
    []
  );

  const loadPreset: UsePizzaBuilder["loadPreset"] = React.useCallback(
    (newPreset) => {
      const preset =
        typeof newPreset === "string" ? presetIdMap[newPreset] : newPreset;

      setPreset(preset);
    },
    []
  );

  return {
    preset,
    setPreset,
    addTopping,
    removeTopping,
    toggleTopping,
    loadPreset,
  };
};

export default usePizzaBuilder;
export type { UsePizzaBuilder };
