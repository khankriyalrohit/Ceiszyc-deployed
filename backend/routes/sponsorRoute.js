import express from "express"
import {createSponsor, deleteSponsor, getAllSponsor, getSponsorsDetails, updateSponsor} from "../controllers/sponsorscontroller.js"


export const sponsorRouter = express.Router();

sponsorRouter.route("/admin/sponsor/new").post(createSponsor);
sponsorRouter.route("/sponsor").get(getAllSponsor);
sponsorRouter.route("/sponsor/:id").get(getSponsorsDetails);


sponsorRouter.route("/admin/sponsor").get(getAllSponsor);
sponsorRouter.route("/admin/sponsor/update/:id").put(updateSponsor);
sponsorRouter.route("/admin/sponsor/delete/:id").delete(deleteSponsor);

