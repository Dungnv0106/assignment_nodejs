import User from "../models/model_user";
import { signinSchema, signupSchema } from "../schema/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    /* Validating the request body against the schema. */
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        message: errors,
      });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: "Email đã được đăng kí",
      });
    }
    /* Hashing the password: mã hóa mật khẩu*/
    const hashedPassword = await bcrypt.hash(password, 5);

    // Tạo người dùng mới với mật khẩu đã được mã hóa
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      // token,
    });
    // const token = await jwt.sign({ _id: newUser._id }, "banThayDat", {
    //   expiresIn: "7d",
    // });
    newUser.password = undefined;
    return res.json({
      message: "Tạo thành công người dùng",
      // accessToken: token,
      user: newUser,
    });
  } catch (error) {}
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(
      { email, password },
      { abortEarly: false }
    );

    if (error) {
      const errors = error.details.map((err) => err.message);
      res.status(400).json({ message: errors });
    }
    // Tìm trong db xem có thằng nào có email như người dùng nhập vào ko
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: `${email} không tồn tại` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Không đúng mật khẩu",
        password,
      });
    }
    const token = jwt.sign({ _id: user._id }, "banThayDat", {
      expiresIn: "7d",
    });
    // user.password = undefined;
    return res.json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {}
};

const getAllMember = async (req, res) => {
  try {
    const allMember = await User.find();
    if (allMember.length == 0) {
      return res.json({ message: "Không có bất kì tài khoản nào" });
    }
    return res.json({
      message: "Lấy tất cả các thành viên",
      member: allMember,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
export { signup, signin, getAllMember };
