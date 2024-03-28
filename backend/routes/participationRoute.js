import express from "express"
import { deleteParticipation, getAllParticipations, getSingleParticipation, myParticipations, newParticipation} from "../controllers/participationcontroller.js"


export const participationRouter = express.Router();

participationRouter.route("/participation/new").post(newParticipation);
participationRouter.route("/participations").get(myParticipations);
participationRouter.route("/participation/:id").get(getSingleParticipation);


participationRouter.route("/admin/participations").get(getAllParticipations);
participationRouter.route("/admin/participations/:id").delete(deleteParticipation);

