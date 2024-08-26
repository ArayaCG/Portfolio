import { Router } from "express";
import { getProjects } from "../controllers/project.controller";


const router: Router = Router();

router.get("/Projects", getProjects)
router.post("/Projects")
router.delete("/Projects")

export default router;
