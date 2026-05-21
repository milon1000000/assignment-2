import { Router } from "express";
import { loginUser, signupUser } from "./auth.controller.js";

const router=Router();

router.post("/signup",signupUser)
router.post("/login",loginUser);

export const authRouter=router;