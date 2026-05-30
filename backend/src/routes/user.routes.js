import express from "express"

import {
  createUser,
  getUsers,
  deleteUser,
  updateUser
} from "../controllers/user.controller.js"

import { protect } from "../middlewares/auth.middleware.js"
import { adminOnly } from "../middlewares/admin.middleware.js"

const router = express.Router()

router.get("/", protect, adminOnly, getUsers)
router.post("/", protect, adminOnly, createUser)
router.delete("/:id", protect, adminOnly, deleteUser)
router.put("/:id",protect,adminOnly,updateUser)

export default router