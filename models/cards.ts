import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
import { IProducts } from "./products";

export interface ICards extends Document {
  productsArr: IProducts[];
  userId: Schema.Types.ObjectId;
}

const CardsSchema = new Schema<ICards>({
  productsArr: [{ type: Schema.Types.ObjectId, ref: "Products" }], // Assuming each item in the array is a reference to a product document
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
});

const Cards = mongoose.models.Cards || mongoose.model("Cards", CardsSchema);

export default Cards;
