import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/usersController.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
