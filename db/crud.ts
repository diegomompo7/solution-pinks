import { Document } from "mongoose";
import { Order, IOrder, IOrderCreate } from "./models/Order";

export const getOrders = async() :Promise<IOrder[]> => {
    return await Order.find()
}

export const postOrder = async(orderData: IOrderCreate): Promise<Document<IOrder>>  => {
    console.log(orderData)
    const order = new Order(orderData)
    const document: Document<IOrder> = (await order.save()) as any
    return document

}