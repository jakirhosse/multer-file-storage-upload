import { Router } from "express";
import { API } from "../utils/constent";
import { fileController } from "../controller/filecontroller";
import { uploads } from "../middleware/helper";

const storageRoutes = Router();
storageRoutes.post(
  `${API.API_CONTEXT}/${API.UPLOADS_IMAGE}`,
  uploads.single("file"),
  fileController.uploadsFileController
);

export default storageRoutes;
