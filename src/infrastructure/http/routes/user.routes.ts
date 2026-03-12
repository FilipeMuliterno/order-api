import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { asyncHandler } from "../../../shared/utils/asyncHandlres";

const router = Router();
const controller = new UserController();

router.post("/", asyncHandler(controller.create.bind(controller)));
router.get("/:id", asyncHandler(controller.findById.bind(controller)));
router.put("/:id", asyncHandler(controller.update.bind(controller)));
router.delete("/:id", asyncHandler(controller.delete.bind(controller)));

export { router as userRoutes };

// Por que usar .bind(controller)?
// Porque senão você perde o contexto do this dentro da classe.
