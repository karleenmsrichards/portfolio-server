import { Router } from "express";
const router = Router();
import { cvInfo } from "./cvController.js";

router.route("/cv").get(cvInfo);

export default router;
