import mongoose, { Schema } from "mongoose";

export interface Category {
  name: string;
}

const CategorySchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
