import express from "express"
import { createTeam, deleteTeam, getAllTeam, getTeamDetails, updateTeam } from "../controllers/teamcontroller.js";


export const teamRouter = express.Router();

teamRouter.route("/admin/team/new").post(createTeam);
teamRouter.route("/team").get(getAllTeam);
teamRouter.route("/team/:id").get(getTeamDetails);


teamRouter.route("/admin/team").get(getAllTeam);
teamRouter.route("/admin/team/update/:id").put(updateTeam);
teamRouter.route("/admin/team/delete/:id").delete(deleteTeam);

