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
  moveOrder: (id: string, state: string) => void
  deleteOrder: (id: string) => void
  pickup: (order: Order) => void;
};

export const OrdersContext = createContext<OrdersContextProps>(
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



  const moveOrder = async (id: string, state: "PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED" | "ANULADO") => {
    try {
      const response = await fetch(`/api/moveOrder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, state, order: orders }),
      });

      if (response.ok) {
        const data = await response.json()
        setOrders(data.data);

      } else {
        console.error('Failed to move order');
      }
    } catch (error) {
      console.error('Error moving order:', error);
    }

  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteOrder`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, order: orders }),
      });

      if (response.ok) {
        const data = await response.json()
        setOrders(data.data);
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const pickup = async (id: string) => {

    try {
      const response = await fetch(`/api/pickupOrder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, order: orders }),
      });

      if (response.ok) {
        const data = await response.json()
        setOrders(data.data);

      } else {
        console.error('Failed to move order');
      }
    } catch (error) {
      console.error('Error moving order:', error);
    }



    const orderId = orders.find(order => order.id === id)!

    console.log(orderId)

    orderId.state = "DELIVERED"

    setOrders(orders.filter(order => order.id != orderId.id));
    setOrders((prev) => [...prev, orderId]);
  }


  const context = {
    orders,
    moveOrder,
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