import jwt from "jsonwebtoken";
import User from "../models/model_user";
export const checkPermission = async (req, res, next) => {
  try {
    // kiểm tra xem user có đăng nhập không
    if (!req.headers.authorization) {
      throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
    }

    // lấy jwt token từ header
    const token = await req.headers.authorization.split(" ")[1];
    // console.log(token);
    // xác thực jwt token
    const { _id } = await jwt.verify(token, "banThayDat");
    // console.log(_id);
    // lấy thông tin user từ database
    const user = await User.findById(_id);
    // kiểm tra xem user có đủ quyền để thực hiện hành động đó không
    if (user.role != "admin") {
      throw new Error("Bạn không có quyền để thực hiện hành động này");
    }

    // console.log("user", user);
    // lưu thông tin user vào request để sử dụng trong các middleware khác
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDIzYTMxNzdjNjgxNTQwNmRlNDQzNzEiLCJpYXQiOjE2ODA1Mzc0ODksImV4cCI6MTY4MTE0MjI4OX0.f2HqxfF3C18tN0_6DMAfQ2k-X8o07BplIjHQV4PLmqk
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDIzYTMxNzdjNjgxNTQwNmRlNDQzNzEiLCJpYXQiOjE2ODA1Mzc0ODksImV4cCI6MTY4MTE0MjI4OX0.f2HqxfF3C18tN0_6DMAfQ2k-X8o07BplIjHQV4PLmqk
