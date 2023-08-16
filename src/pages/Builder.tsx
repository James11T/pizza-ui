import { useNavigate, useSearchParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import Pizza from "../components/Pizza";
import PizzaBuilder from "../components/PizzaBuilder";
import Delete from "../components/icons/Delete";
import Plus from "../components/icons/Plus";
import { UsePizzaBuilder } from "../hooks/usePizzaBuilder";
import { UsePizzaBasket } from "../hooks/usePizzaBasket";
import Check from "../components/icons/Check";
import { toast } from "react-toastify";

interface Props {
  builder: UsePizzaBuilder;
  basket: UsePizzaBasket;
}

const BuilderPage = ({ builder, basket }: Props) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isEditing = searchParams.get("edit") !== null;

  const onAddToBasket = () => {
    basket.add(builder.preset);
    navigate("/basket");
    isEditing ? toast("Changed saved") : toast("Added to basket");
  };

  return (
    <div className="mx-auto max-w-[1200px] py-2 [&>*]:mb-3">
      <Pizza
        toppings={builder.preset.toppings}
        title={builder.preset.name}
        img={builder.preset.image}
        className="sticky top-16 z-30 mx-2"
        allowGrowth={true}
        actions={
          <>
            {isEditing ? (
              <ActionButton
                text="SAVE CHANGES"
                icon={<Check />}
                className="bg-edit"
                onClick={onAddToBasket}
              />
            ) : (
              <ActionButton
                text="ADD TO BASKET"
                icon={<Plus />}
                className="bg-confirm"
                onClick={onAddToBasket}
              />
            )}
            <ActionButton
              text="CANCEL"
              icon={<Delete />}
              className="bg-remove"
              onClick={() => navigate("/")}
            />
          </>
        }
      />
      <PizzaBuilder
        selectedToppings={builder.preset.toppings}
        onToppingClicked={builder.toggleTopping}
      />
    </div>
  );
};

export default BuilderPage;
export type { Props };
