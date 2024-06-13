import { Order } from "@/dtos/Order.dto";

let orders: Order[] = [];

export const getOrders = () => {
    return orders;
};

export const moveOrder = (
    orderId: string, 
    state: "PENDING" | "IN_PROGRESS" | "READY" | "COLLECTED" | "DELIVERED" | "ANULADO"
) => {
    
    orders = orders.map(order => order.id === orderId ? { ...order, state } : order);
};
