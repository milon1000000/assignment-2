import { Router } from "express";
import { CreateUser, deleteUser, getSingleUser, getUser, updateUser } from "./user.controller.js";
import { auth } from "../../middleware/auth.js";
import { USER_ROLE } from "../../types/index.js";

const router=Router();

router.post("/CreateUser",CreateUser);
router.get("/getUser",auth(USER_ROLE.admin,USER_ROLE.agent),getUser);
router.get("/getSingleUser/:id",getSingleUser)
router.put("/updateUser/:id",updateUser);
router.delete("/deleteUser/:id",deleteUser)
export const userRouter= router;