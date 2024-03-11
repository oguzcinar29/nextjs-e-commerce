import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
import { IProducts } from "./products";

export interface ICardsTypes extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  count: number;
}

export interface ICards extends Document {
  productsArr: ICardsTypes[];
  userId: Schema.Types.ObjectId;
}

const CardsSchema = new Schema<ICards>({
  productsArr: [],
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
});

const Cards = mongoose.models.Cards || mongoose.model("Cards", CardsSchema);

export default Cards;
