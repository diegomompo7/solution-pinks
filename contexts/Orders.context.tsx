import { Order } from "@/dtos/Order.dto";
import { OrderOrchestrator } from "@/lib";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type OrdersContextProps = {
  orders: Array<Order>;
  moveOrder: (order:Order, state:string) => void
  readyOrder: (orderId:Order) => void
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

  const moveOrder = (order: Order, state:"PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    order.state = state;
    setOrders((prev) => [...prev, order]);

  };

  const readyOrder = (orderId: Order) => {
    console.log(orderId)
    setOrders(orders.filter(order => order.id != orderId.id));

  };


  const pickup = (order: Order) => {
    alert(
      "necesitamos eliminar del kanban a la orden recogida! Rapido! antes que nuestra gente de tienda se confunda!"
    );
  };


  const context = {
    orders,
    moveOrder,
    readyOrder,
    pickup,
  };

  return (
    <OrdersContext.Provider value={context}>
      {props.children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
