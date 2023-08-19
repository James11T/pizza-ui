import React from "react";
import { Order } from "../types";

const { VITE_API_URL } = import.meta.env;

const APIGetOrderStatus = async (uuid: string): Promise<Order["status"]> => {
  const response = await fetch(`${VITE_API_URL}/order/${uuid}/status`);
  const data = await response.json();

  return data["status"];
};

const APISubmitOrder = async (
  order: Omit<Order, "uuid" | "status">
): Promise<{ uuid: string }> => {
  const response = await fetch(`${VITE_API_URL}/order/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  const data = await response.json();
  return data;
};

const APIGetOrder = async (uuid: string): Promise<Order> => {
  const response = await fetch(`${VITE_API_URL}/order/${uuid}`);
  const data = await response.json();

  return data;
};

const usePizzaOrder = () => {
  const [orderUUID, setOrderUUID] = React.useState<string | undefined>(
    undefined
  );
  const [order, setOrder] = React.useState<Order | undefined>(undefined);

  const refreshOrderStatus = React.useCallback(() => {
    if (!orderUUID) return;
    APIGetOrderStatus(orderUUID).then((status) =>
      setOrder((old) => {
        if (!old) return old;
        const newOrder = { ...old, status };
        return newOrder;
      })
    );
  }, [orderUUID]);

  const submitOrder = (order: Omit<Order, "uuid" | "status">) => {
    APISubmitOrder(order).then((data) => setOrderUUID(data.uuid));
  };

  React.useEffect(() => {
    if (!orderUUID) return;

    APIGetOrder(orderUUID).then(setOrder);
  }, [orderUUID]);

  React.useEffect(() => {
    const rawData = localStorage.getItem("order");
    if (!rawData) return;
    setOrderUUID(rawData);
  }, []);

  React.useEffect(() => {
    if (!orderUUID) return;
    const interval = window.setInterval(refreshOrderStatus, 1000);
    return () => window.clearInterval(interval);
  }, [orderUUID, refreshOrderStatus]);

  return {
    refreshOrderStatus,
    submitOrder,
    order,
    activeOrder: Boolean(order?.status !== "DONE"),
  };
};

export default usePizzaOrder;
