import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useOrders } from "./Orders.context";
import { Rider } from "@/dtos/Rider.dto";

export type RidersContextProps = {
  riders: Array<Rider>;
};

export const RidersContext = createContext<RidersContextProps>(
  // @ts-ignore
  {
  }
);

export type RidersProviderProps = {
  children: ReactNode;
};

export function RidersProvider(props: RidersProviderProps) {
  const [riders, setRiders] = useState<Array<Rider>>([]);
  const [assignedOrders, setAssignedOrders] = useState<string[]>([]);
  const { orders, pickup } = useOrders();


  useEffect(() => {
    const order = orders.find((order) =>  order.state === "COLLECTED" && !assignedOrders.includes(order.id));
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
      }, );
    }
    
    
  }, [orders]);


  useEffect(() => {
    const orderDelvietred = orders.filter((order) =>  order.state === "DELIVERED") ;
    orderDelvietred.map((order) => {
      setRiders(riders.filter(r => r.orderWanted != order.id))
    })

  },[orders])


  const context = { riders, setRiders };
  return (
    <RidersContext.Provider value={context}>
      {props.children}
    </RidersContext.Provider>
  );
}



export const useRiders = () => useContext(RidersContext);
