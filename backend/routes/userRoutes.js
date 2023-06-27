import express from "express";
import { authUser, editUser, logoutUser, profileUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()



router.post('/auth', authUser)

router.post('/', registerUser)

router.post('/logout', logoutUser)

router.get('/profile', protect, profileUser)

router.put('/profile', protect, editUser)

export default router