import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useRiders } from "./Riders.context";

export type OrdersContextProps = {
  orders: Array<Order>;
  moveOrder: (orderId:Order, state:string) => void
  readyOrder: (orderId:Order) => void
  deleteOrder: (orderId:Order) => void
  pickup: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
  // @ts-ignore
  {}
);

export type OrdersProviderProps = {
  children: ReactNode;
};

export function OrdersProvider(props: OrdersProviderProps) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  useEffect(() => {
    const orderOrchestrator = new OrderOrchestrator();
    const listener = orderOrchestrator.run();
    listener.on("order", (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5174/", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(orders), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));

  },[orders])
  
  const moveOrder = (orderId: Order, state:"PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED") => {
    orderId.state = state;
    setOrders(orders.filter(order => order.id != orderId.id));
    setOrders((prev) => [...prev, orderId]);

  };

  const deleteOrder = (orderId: Order) => {
    setOrders(orders.filter(order => order.id != orderId.id));
  }

  const readyOrder = (orderId: Order) => {
    setOrders(orders.filter(order => order.id != orderId.id));

  };


  const pickup = (id: string) => {


    const orderId = orders.find(order => order.id === id)!

    console.log(orderId)

    orderId.state = "DELIVERED"

    setOrders(orders.filter(order => order.id != orderId.id));
    setOrders((prev) => [...prev, orderId]);
  }


  const context = {
    orders,
    moveOrder,
    readyOrder,
    deleteOrder,
    pickup,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
function setAssignedOrders(arg0: any) {
  throw new Error("Function not implemented.");
}