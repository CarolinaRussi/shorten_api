import express from "express";
import { addUrl, getLongUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/", addUrl);

router.get("/:short_url_code", getLongUrl);

export default router;