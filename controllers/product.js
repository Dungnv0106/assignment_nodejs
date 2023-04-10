import Product from "../models/model_pro";
import joi from "joi";
import Category from "../models/model_category";

// Validate đầu vào
const productSchema = joi.object({
  name: joi.string().required(),
  price: joi
    .number()
    .required()
    .messages({ "any.required": "Vui lòng nhập giá" }),
  description: joi.string(),
  categoryId: joi
    .string()
    .required()
    .messages({ "any.required": "Vui lòng nhập categoryId" }),
});
// Lấy tất cả sản phẩm
const getAll = async (req, res) => {
  // console.log(req.query);
  const {
    _sort = "createAt",
    _order = "desc",
    _limit = 10,
    _page = 1,
  } = req.query;
  // console.log(_sort, _order, _limit, _page);
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  // return;
  try {
    // const products = await Product.find();
    //Đối số đầu tiên là một đối tượng truy vấn MongoDB, trong trường hợp này là {} để lấy tất cả sản phẩm. Đối số thứ hai là đối tượng options chứa thông tin về phân trang và sắp xếp dữ liệu.
    const products = await Product.paginate({}, options);
    if (products.length == 0) {
      return res.json({ message: "Không có sản phẩm nào" });
    }
    return res.json({
      message: `Get All Product ${_order}`,
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

// Lấy 1 sản phẩm
const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "-__v -products"
    );
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

// Thêm sản phẩm mới
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
    // Sau khi thêm thành công sản phẩm sẽ lấy id của sp nhét vào mảng products trong bảng Category.
    await Category.findByIdAndUpdate(newProduct.categoryId, {
      $addToSet: {
        products: newProduct._id,
      },
    });
    return res.json({
      message: "Thêm sản phẩm thành công",
      newProduct,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

// Cập nhật sản phẩm
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

// Xóa sản phẩm
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
