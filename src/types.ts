interface InventoryConfig {
  toppings: Topping[];
  toppingCategories: ToppingCategory[];
  presets: ToppingPreset[];
}

interface ToppingCategory {
  id: string;
  name: string;
  mutuallyExclusive: boolean;
  order: number;
}

interface Topping {
  id: string;
  name: string;
  conflicts: ToppingCategory["id"][];
  category: ToppingCategory["id"];
  inStock: boolean;
}

interface ToppingPreset {
  id: string;
  name: string;
  toppings: string[];
  image: string;
  description: string;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type {
  Topping,
  ToppingCategory,
  ToppingPreset,
  InventoryConfig,
  Optional,
};
