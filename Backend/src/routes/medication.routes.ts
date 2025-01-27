import { response, Router } from "express";
import * as medicationController from "../controllers/medication.controllers";
import { verifyToken } from "../middleware/authenticate";

const medRouter = Router();

medRouter.get("/", verifyToken, medicationController.getAllMedications);
medRouter.post("/", verifyToken, medicationController.addMedication);
medRouter.put("/update", verifyToken, medicationController.updateMedication);
medRouter.delete("/delete", verifyToken, medicationController.deleteMedication);

export default medRouter;
