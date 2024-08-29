import { Router } from "express";
import projectRoute from "./projectRoute";
import contactMessageRoute from "./contactMessageRoute";


const router: Router = Router();

router.use("/projects", projectRoute);
router.use("/contactMessage", contactMessageRoute);

export default router;
