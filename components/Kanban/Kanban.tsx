import s from "./Kanban.module.scss";
import Column from "../Column";
import { useOrders } from "@/contexts/Orders.context";
import { useRiders } from "@/contexts/Riders.context";

export default function Kanban() {
  const { orders,  moveOrder, deleteOrder} = useOrders();

  const handleOrderClick = (id: string, state:"PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED") => {
    moveOrder(id, state)
  };

  const handlDeleteOrder = (id: string) => {
    deleteOrder(id)
  }


  return (
    <section className={s["pk-kanban"]}>
      <Column
        title="Pendiente"
        orders={orders.filter((i) => i.state === "PENDING")}
        onClick={(e) =>
         handleOrderClick(e.id, "IN_PROGRESS")
        }
        onDelete={handlDeleteOrder}
      />
      <Column title="En preparación" orders={orders.filter((i) => i.state === "IN_PROGRESS") }         onClick={(e) =>
         handleOrderClick(e.id, "READY")
        } />
      <Column title="Listo" orders={orders.filter((i) => i.state === "READY")} onClick={(e) =>
         handleOrderClick(e.id, "COLLECTED")}/>
      <Column title="Entregado" orders={orders.filter((i) => i.state === "DELIVERED")}/>
    </section>
  );
}
