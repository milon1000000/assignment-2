import { auth } from './../../middleware/auth.js';
import { Router } from "express";
import { createIssuesController, deleteIssuesController, getAllIssuesController, getSingleIssuesController, updateIssuesController } from "./issues.controller.js";
import { USER_ROLE } from '../../types/index.js';
const router=Router();

router.post("/",auth(),createIssuesController);
router.get("/",auth(),getAllIssuesController);
router.get("/:id",auth(),getSingleIssuesController)
router.patch("/:id",auth(USER_ROLE.maintainer,USER_ROLE.contributor),updateIssuesController);
router.delete("/:id",auth(),deleteIssuesController)

export const issuesRouter=router;