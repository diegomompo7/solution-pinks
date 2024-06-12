import mongoose, { Document, Schema, Model } from "mongoose";


export interface IOrderCreate {
    idOrder: string;
    state: string;
  }

export type IOrder = IOrderCreate & Document;

const orderSchema = new Schema({
  idOrder: { type: String, required: true },
  state: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "READY", "COLLECTED", "DELIVERED"],
    required: true,
  },
});

let Order: Model<IOrder>;

try {
  Order = mongoose.model<IOrder>("Order");
} catch (e) {
  Order = mongoose.model<IOrder>("Order", orderSchema, "orders");
}
