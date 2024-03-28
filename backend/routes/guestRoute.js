import express from "express"
import { createGuest, deleteGuest, getAllGuest, getGuestsDetails, updateGuest } from "../controllers/guestcontroller.js";


export const guestRouter = express.Router();

guestRouter.route("/admin/guest/new").post(createGuest);
guestRouter.route("/guest").get(getAllGuest);
guestRouter.route("/guest/:id").get(getGuestsDetails);


guestRouter.route("/admin/guest").get(getAllGuest);
guestRouter.route("/admin/guest/update/:id").put(updateGuest);
guestRouter.route("/admin/guest/delete/:id").delete(deleteGuest);

