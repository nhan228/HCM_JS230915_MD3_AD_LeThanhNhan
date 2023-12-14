import express from "express";
import userController from "../../controller/user.controller"

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
