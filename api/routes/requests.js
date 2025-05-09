import express from "express";
import { createRequest,deleteRequest,acceptRequest,viewRequests } from "../controllers/request.js";
import { verifyUser,verifyAdmin} from "../utils/verifyToken.js";

const router = express.Router();

router.post("/",verifyUser,createRequest);
router.get("",verifyAdmin,viewRequests);
router.put("/:id",verifyAdmin,acceptRequest);
router.delete("/:id",verifyAdmin, deleteRequest);

export default router