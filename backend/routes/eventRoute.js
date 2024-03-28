import express from "express"
import {createEvent, deleteEvent, getAdminEvents, getAllEvents, getEventsDetails, updateEvent} from "../controllers/eventcontroller.js"


export const eventRouter = express.Router();

eventRouter.route("/admin/event/new").post(createEvent);
eventRouter.route("/events").get(getAllEvents);
eventRouter.route("/event/:id").get(getEventsDetails);


eventRouter.route("/admin/events").get(getAdminEvents);
eventRouter.route("/admin/events/:id").put(updateEvent);
eventRouter.route("/admin/events/:id").delete(deleteEvent);

