import User from "../models/model_user";

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: "Email đã được đăng kí",
      });
    }
    const newUser = await User.create(req.body);
    return res.json({
      message: "Tạo thành công người dùng",
      user: newUser,
    });
  } catch (error) {}
};

export { signup };
