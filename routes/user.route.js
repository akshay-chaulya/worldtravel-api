import { Router } from "express";
import { contactUs } from "../controllers/user.controller.js";
import citiesRouter from "./cities.route.js";

const router = Router();

router.post("/contact-us", contactUs);
router.use("/cities", citiesRouter);

export default router;
