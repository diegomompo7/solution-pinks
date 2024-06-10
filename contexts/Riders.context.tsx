import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { getRandomInterval } from "@/lib/utils";
import { Rider } from "@/dtos/Rider.dto";

export type RidersContextProps = {
  riders: Array<Rider>;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {}
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup, readyOrder } = useOrders();

  console.log(assignedOrders)

  useEffect(() => {
    const order = orders.find((order) =>  order.state === "COLLECTED" && !assignedOrders.includes(order.id));
    console.log(order)
    if (order) {
      setAssignedOrders((prev) => [...prev, order.id]);
      setTimeout(() => {
        setRiders((prev) => [
          ...prev,
          {
            orderWanted: order.id,
            pickup,
          },
        ]);
        readyOrder(order)
      }, );
    }

      console.log(riders)
    
    
  }, [orders]);

  useEffect(() => {
    const order = orders.find((order) =>  order.state === "DELIVERED" && !assignedOrders.includes(order.id));
    console.log(order)
    if (order) {
      setAssignedOrders(assignedOrders.filter(assigned => assigned !== order.id));
      setRiders(riders.filter(rider => rider.orderWanted != order.id));
    }

      console.log(riders)
    
    
  }, [orders]);


  const context = { riders };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}

export const useRiders = () => useContext(RidersContext);
