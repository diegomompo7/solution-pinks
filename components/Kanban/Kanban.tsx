import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { Order } from "@/dtos/Order.dto";
import { useRiders } from "@/contexts/Riders.context";
import { useEffect } from "react";

export default function Kanban() {
  const { riders } = useRiders();
  const { orders, moveOrder} = useOrders();

  const handleOrderClick = (id: string, state:"PENDING" | "IN_PROGRESS" | "READY" | "DELIVERED") => {
    const orderId = orders.find(order => order.id === id)!
    moveOrder(orderId, state)
  };


  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(e) =>
         handleOrderClick(e.id, "IN_PROGRESS")
        }
      />
      <Column title="En preparación" orders={orders.filter((i) => i.state === "IN_PROGRESS") }         onClick={(e) =>
         handleOrderClick(e.id, "READY")
        } />
      <Column title="Listo" orders={orders.filter((i) => i.state === "READY")} />
    </section>
  );
}
