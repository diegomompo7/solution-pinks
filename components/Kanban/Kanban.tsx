import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { Order } from "@/dtos/Order.dto";
import { useRiders } from "@/contexts/Riders.context";
import { useEffect } from "react";

export default function Kanban() {
  const { riders } = useRiders();
  const { orders, moveOrder, deleteOrder} = useOrders();

  /*const handleOrderClick = (id: string, state:"PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED") => {
    const orderId = orders.find(order => order.id === id)!
    moveOrder(orderId, state)
  };

  const handlDeleteOrder = (id: string) => {
    const orderId = orders.find(order => order.id === id)!
    deleteOrder(orderId)
  }*/


  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente" orders={[]}/>
      <Column title="En preparación" orders={[]}  />
      <Column title="Listo" orders={[]}/>
      <Column title="Entregado" orders={[]} />
    </section>
  );
}
