import Pizza from "../components/Pizza";
import { inventory } from "../data";
import { ToppingPreset } from "../types";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import useRoute from "../hooks/useRoute";
import PageTitle from "../components/PageTitle";

interface Props {
  builder: UsePizzaBuilder;
}

const HomePage = ({ builder }: Props) => {
  const { navigate } = useRoute();

  const handlePresetSelect = (preset: ToppingPreset) => {
    navigate("BUILDER");
    builder.loadPreset(preset);
  };

  return (
    <>
      <PageTitle>Menu</PageTitle>
      <div className="grid grid-cols-1 gap-2 p-2 pt-0 sm:grid-cols-2">
        {inventory.presets.map((preset) => (
          <Pizza
            key={preset.id}
            description={preset.description}
            img={preset.image}
            title={preset.name}
            onClick={() => handlePresetSelect(preset)}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;
export type { Props };
