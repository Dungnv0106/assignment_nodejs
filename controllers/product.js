import Product from "../models/model_pro";
import joi from "joi";

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  description: joi.string(),
});
const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length == 0) {
      return res.json({ message: "Không có sản phẩm nào" });
    }
    return res.json({
      message: "Get All Product",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.json({ message: "Không có sản phẩm nào" });
    }
    return res.json({
      message: "Detail Product",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const newProduct = await Product.create(req.body);
    if (!newProduct) {
      return res.json({ message: "Không thêm được sản phẩm" });
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      newProduct,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({ message: "Cập nhật không thành công" });
    }
    return res.json({
      message: "Cập nhật thành công sản phẩm ",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    return res.json({
      message: "Xóa thành công sản phẩm",
      product,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
export { getAll, getOne, addProduct, updateProduct, deleteProduct };
