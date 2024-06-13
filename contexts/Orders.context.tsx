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
  
  const moveOrder = async (orderId: Order, state:"PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED" | "ANULADO") => {
    try {
      const response = await fetch(`/api/moveOrder`, {
        method: 'PUT',
        body: JSON.stringify({id: orderId.id, state: state}),
      });

      if (response.ok) {
        orderId.state = state;
        setOrders(orders.filter(order => order.id != orderId.id));
        setOrders((prev) => [...prev, orderId]);

      } else {
        console.error('Failed to move order');
      }
    } catch (error) {
      console.error('Error moving order:', error);
    }

  };

  const deleteOrder = async (orderId: Order) => {
    try {
      const response = await fetch(`/api/deleteOrders`, {
        method: 'DELETE',
        body: orderId.id,
      });

      if (response.ok) {
        // Eliminar la orden localmente después de que se haya eliminado en el servidor
        setOrders(orders.filter(order => order.id !== orderId.id));
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };


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