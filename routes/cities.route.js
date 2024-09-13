import { Router } from "express";
import { verifyAuth } from "../middleware/index.js";
import {
  addCities,
  deleteCity,
  getCities,
  getCity,
  getCountries,
} from "../controllers/cities.controllers.js";

const router = Router();

router.post("/add", verifyAuth, addCities);
router.get("/", verifyAuth, getCities);
router.get("/countries", verifyAuth, getCountries);
router.delete("/delete/:id", verifyAuth, deleteCity);
router.get("/:id", verifyAuth, getCity);

export default router;
