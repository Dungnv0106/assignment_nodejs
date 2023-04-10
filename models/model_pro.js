import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxLength: 300,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, versionKey: false }
);
productScheme.plugin(mongoosePaginate);

export default mongoose.model("Product", productScheme);
