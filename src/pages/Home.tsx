import ActionButton from "../components/ActionButton";
import Pizza from "../components/Pizza";
import { inventory } from "../data";
import { useNavigate } from "react-router-dom";
import { ToppingPreset } from "../types";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import Edit from "../components/icons/Edit";
import Plus from "../components/icons/Plus";
import PageTitle from "../components/PageTitle";
import cn from "clsx";
import { UsePizzaBasket } from "../hooks/usePizzaBasket";
import { toast } from "react-toastify";

interface Props {
  builder: UsePizzaBuilder;
  basket: UsePizzaBasket;
}

const HomePage = ({ builder, basket }: Props) => {
  const navigate = useNavigate();

  const handlePresetSelect = (preset: ToppingPreset) => {
    navigate("builder");
    builder.loadPreset(preset);
  };

  const handlePresetAdd = (preset: ToppingPreset) => {
    basket.add(preset);
    toast("Added to basket");
    // navigate("basket");
  };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-2 p-2">
      <PageTitle>Menu</PageTitle>
      {inventory.presets.map((preset) => (
        <Pizza
          key={preset.id}
          description={preset.description}
          img={preset.image}
          title={preset.name}
          actions={
            <>
              <ActionButton
                text="ADD TO BASKET"
                icon={<Plus />}
                className={cn("bg-confirm", preset.id === "CUSTOM" && "hidden")}
                onClick={() => handlePresetAdd(preset)}
              />
              <ActionButton
                text="CUSTOMISE"
                icon={<Edit />}
                className="bg-edit"
                onClick={() => handlePresetSelect(preset)}
              />
            </>
          }
        />
      ))}
    </div>
  );
};

export default HomePage;
export type { Props };
