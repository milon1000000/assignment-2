import { Router } from "express";
import { createIssuesController, getAllIssuesController, getSingleIssuesController } from "./issues.controller.js";
const router=Router();

router.post("/",createIssuesController);
router.get("/",getAllIssuesController);
router.get("/:id",getSingleIssuesController)

export const issuesRouter=router;