import express from "express";
import { getAllMember, signin, signup } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/members", getAllMember);
export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhZmJmMTE2MzJlNjliNzc4ZmRkZDkiLCJpYXQiOjE2ODA1Mzg2MzcsImV4cCI6MTY4MTE0MzQzN30.bKtOTPeAEINRpITyhS0gqkLQh7Z5GXkTnFL8KH3-3Oo
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhZmJmMTE2MzJlNjliNzc4ZmRkZDkiLCJpYXQiOjE2ODA1Mzg2MDksImV4cCI6MTY4MTE0MzQwOX0.WHs-43k1_mEsI9JOiedCobAJj3dDvW2ZCJEFeeoQIM4
