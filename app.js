import express from "express";
import routerProduct from "./routers/pro_router";
import routerCategory from "./routers/category";
import routerAuth from "./routers/auth";
import mongoose from "mongoose";
const morgan = require("morgan");
const cors = require("cors");

const port = 4000;
const app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/we17309");

app.use("/api", routerProduct);
app.use("/api", routerAuth);
app.use("/api", routerCategory);
app.listen(port, () => {
  console.log("Server running port on http://localhost:" + port);
});

//Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDIzYTMxNzdjNjgxNTQwNmRlNDQzNzEiLCJpYXQiOjE2ODAwNTcxMTEsImV4cCI6MTY4MDA2MDcxMX0.9R3_qCXzrpC7WhYSJbc499Uk--R-CuIvtfjbsOTr6dM
//admin2 ; eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI0NjYyMTVkZGE5NDc2YzQ2MzY0ZWYiLCJpYXQiOjE2ODAxMDcwNDEsImV4cCI6MTY4MDExMDY0MX0.SI6okAB3cokXSghg1rL2xTSit61vrsH4dG0kZmlqSt0

//Member: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDIzYTM1NjA0YTg1OTBiNmIxOThmZTQiLCJpYXQiOjE2ODAwNTcxNzQsImV4cCI6MTY4MDA2MDc3NH0.-rcEjquHNSqjzlZCpwGOckAjZQhARXkTDfAtOu1tbaw
