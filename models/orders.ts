import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
import { IProducts } from "./products";

export interface IOrdersTypes extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  count: number;
}

export interface IOrders extends Document {
  productsArr: IOrdersTypes[];

  userId: Schema.Types.ObjectId;
}

const OrdersSchema = new Schema<IOrders>(
  {
    productsArr: [],

    userId: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", OrdersSchema);

export default Orders;
