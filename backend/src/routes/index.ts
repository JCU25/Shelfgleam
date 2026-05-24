import routes from "./v1/index.js";
import { Router } from "express";

const router = Router();

router.use("/v1", routes);

export default router;
