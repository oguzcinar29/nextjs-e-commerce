import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";

export interface IProducts extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const productsSchema = new Schema<IProducts>({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productsSchema);

export default Products;
