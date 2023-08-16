import React from "react";
import { ToppingPreset } from "../types";

interface UsePizzaBasket {
  contents: ToppingPreset[];
  add: (preset: ToppingPreset) => void;
  remove: (index: number) => void;
  clear: () => void;
}

const usePizzaBasket = (): UsePizzaBasket => {
  const [contents, setContents] = React.useState<UsePizzaBasket["contents"]>(
    []
  );

  const add = React.useCallback(
    (preset: ToppingPreset) => setContents((old) => [...old, preset]),
    []
  );

  const remove = React.useCallback(
    (index: number) =>
      setContents((old) => {
        const newArr = [...old];
        newArr.splice(index, 1);
        return newArr;
      }),
    []
  );

  const clear = React.useCallback(() => setContents([]), []);

  return { contents, add, remove, clear };
};

export default usePizzaBasket;
export type { UsePizzaBasket };
