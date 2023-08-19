import React from "react";
import { Order, OrderStatus } from "../types";
import { presetIdMap, toppingIdMap } from "../data";
import cn from "clsx";

const { VITE_API_URL } = import.meta.env;

const getAllOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${VITE_API_URL}/order`);
  const data = await response.json();

  return data;
};

const updateOrder = async (
  uuid: string,
  status: OrderStatus
): Promise<{ uuid: string; status: OrderStatus }> => {
  const response = await fetch(`${VITE_API_URL}/order/${uuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status,
    }),
  });

  const data = await response.json();

  return data;
};

const statusStringMap: Record<OrderStatus, string> = {
  WAITING: "Waiting",
  PREPARING: "Preparing",
  COOKING: "Cooking",
  DONE: "Done",
};

const orderStatusButtonClasses =
  "bg-gray-200 basis-full rounded-lg font-semibold hover:brightness-95 active:brightness-90";

const activeStatusButtonClasses = "bg-indigo-300";

const PizzaOrder = ({ pizza }: { pizza: Order["pizzas"][number] }) => {
  return (
    <div className="rounded-lg bg-white text-sm ring-1 ring-gray-300">
      <div className="border-b-[1px] border-gray-300 p-1 font-semibold">
        {presetIdMap[pizza.preset_id].name}
      </div>
      <div className="flex flex-col gap-1 p-1">
        {pizza.toppings.map((toppingID) => {
          const topping = toppingIdMap[toppingID];
          return <div>{topping.name}</div>;
        })}
      </div>
    </div>
  );
};

const ControlPanel = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      getAllOrders().then(setOrders);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      {orders
        .sort((a, b) => {
          if (a.status === "DONE" && b.status === "DONE") return 0;
          if (a.status === "DONE") return 1;
          if (b.status === "DONE") return -1;
          return 0;
        })
        .map((order) => (
          <div
            className={cn(
              "flex gap-2 rounded-lg bg-white p-2 shadow ring-1 ring-black ring-opacity-5",
              order.status === "DONE" && "opacity-50"
            )}
          >
            <div className="space-y-2 ">
              <div className="text-xl">
                Order{" "}
                <span className="font-semibold">
                  {statusStringMap[order.status]}
                </span>
              </div>
              <div className="flex gap-2">
                {order.pizzas.map((pizza) => (
                  <PizzaOrder pizza={pizza} />
                ))}
              </div>
            </div>
            <div className="ml-auto flex max-h-24 w-full max-w-[400px] gap-2">
              <button
                className={cn(
                  orderStatusButtonClasses,
                  order.status === "PREPARING" && activeStatusButtonClasses
                )}
                onClick={() => updateOrder(order.uuid, "PREPARING")}
              >
                PREPARING
              </button>
              <button
                className={cn(
                  orderStatusButtonClasses,
                  order.status === "COOKING" && activeStatusButtonClasses
                )}
                onClick={() => updateOrder(order.uuid, "COOKING")}
              >
                COOKING
              </button>
              <button
                className={cn(
                  orderStatusButtonClasses,
                  order.status === "DONE" && activeStatusButtonClasses
                )}
                onClick={() => updateOrder(order.uuid, "DONE")}
              >
                DONE
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ControlPanel;
