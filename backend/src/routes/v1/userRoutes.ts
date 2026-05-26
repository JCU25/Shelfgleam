import { Router } from "express";
import userController from "../../controllers/userController.js";

const router = Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Create new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               displayName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

export default router;
