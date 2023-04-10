import joi from "joi";

const signupSchema = joi.object({
  name: joi.string().messages({
    "string.empty": "Vui lòng nhập tên của bạn",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email không đúng định dạng",
    "any.required": "Bắt buộc nhập email",
  }),
  password: joi.string().required().min(4).messages({
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất {#limit} ký tự",
    "any.required": "Bắt buộc nhập password",
  }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "string.empty": "confirmPassword không được để trống",
    "any.only": "confirmPassword không khớp",
    "any.required": "confirmPassword là bắt buộc",
  }),
});

const signinSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "string.email": "Email Không đúng định dạng",
    "any.required": "Email là bắt buộc",
  }),
  password: joi.string().required().min(4).messages({
    "string.empty": "Password không được để trống",
    "string.min": "Password phải có ít nhất{#limit} ký tự",
    "any.required": "Password là bắt buộc",
  }),
});

export { signupSchema, signinSchema };
