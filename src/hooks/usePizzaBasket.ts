import React from "react";
import { ToppingPreset } from "../types";

interface UsePizzaBasket {
  contents: ToppingPreset[];
  add: (preset: ToppingPreset) => void;
  remove: (index: number) => void;
  clear: () => void;
}

const save = (data: UsePizzaBasket["contents"]) =>
  localStorage.setItem("basket", JSON.stringify(data));

const usePizzaBasket = (): UsePizzaBasket => {
  const [contents, setContents] = React.useState<UsePizzaBasket["contents"]>(
    []
  );

  React.useEffect(() => {
    const persistentRaw = localStorage.getItem("basket");
    if (!persistentRaw) return;
    const data = JSON.parse(persistentRaw);
    setContents(data);
  }, []);

  const add = React.useCallback(
    (preset: ToppingPreset) =>
      setContents((old) => {
        const newData = [...old, preset];
        save(newData);
        return newData;
      }),
    []
  );

  const remove = React.useCallback(
    (index: number) =>
      setContents((old) => {
        const newArr = [...old];
        newArr.splice(index, 1);
        save(newArr);
        return newArr;
      }),
    []
  );

  const clear = React.useCallback(() => {
    setContents([]);
    save([]);
  }, []);

  return { contents, add, remove, clear };
};

export default usePizzaBasket;
export type { UsePizzaBasket };
