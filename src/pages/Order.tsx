import usePizzaOrder from "../hooks/usePizzaOrder";
import { ORDER_STATUSES } from "../types";
import cn from "clsx";

const orderPointClasses = "w-4 h-4 rounded-full  ring-4 ring-offset-4 z-10";

const metPointClasses = "bg-indigo-600 ring-indigo-400";
const notMetPointClasses = "bg-gray-500 ring-gray-400";

interface OrderPageProps {
  order: ReturnType<typeof usePizzaOrder>;
}

const OrderPage = ({ order }: OrderPageProps) => {
  const { order: orderOrder } = order;

  if (!orderOrder) {
    return (
      <div>
        You don't have a pending order, please go back to the menu and create an
        order.
      </div>
    );
  }

  const orderIndex = ORDER_STATUSES.indexOf(orderOrder.status);

  return (
    <div className="flex h-full flex-col">
      <div className="p-4 pt-0">
        <div className="text-2xl">Your Order</div>
        {order.order?.status === "DONE" ? (
          <div>Your order is ready and will be with you shortly!</div>
        ) : (
          <div>
            We've received your order and are working hard to create the perfect
            pizza just for you.
          </div>
        )}
      </div>
      <div className="flex flex-grow gap-6 px-4">
        <div className="py-5">
          <div className="relative mx-auto flex h-full w-4 flex-col justify-between rounded-full bg-gray-300">
            <div className={cn(orderPointClasses, metPointClasses)}></div>
            <div
              className={cn(
                orderPointClasses,
                orderIndex > 0 ? metPointClasses : notMetPointClasses
              )}
            ></div>
            <div
              className={cn(
                orderPointClasses,
                orderIndex > 1 ? metPointClasses : notMetPointClasses
              )}
            ></div>
            <div
              className={cn(
                orderPointClasses,
                orderIndex > 2 ? metPointClasses : notMetPointClasses
              )}
            ></div>
            <div
              className="absolute w-full rounded-t-full bg-indigo-400 transition-[height] duration-500"
              style={{
                height: `${orderIndex * (100 / (ORDER_STATUSES.length - 1))}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-between py-2 text-4xl font-semibold">
          <div>Waiting</div>
          <div>Preparing</div>
          <div>Cooking</div>
          <div>Done</div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
