import { auth } from './../../middleware/auth.js';
import { Router } from "express";
import { createIssuesController, getAllIssuesController, getSingleIssuesController, updateIssuesController } from "./issues.controller.js";
import { USER_ROLE } from '../../types/index.js';
const router=Router();

router.post("/",createIssuesController);
router.get("/",getAllIssuesController);
router.get("/:id",getSingleIssuesController)
router.patch("/:id",auth(USER_ROLE.maintainer,USER_ROLE.contributor),updateIssuesController)

export const issuesRouter=router;