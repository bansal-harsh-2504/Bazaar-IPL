import express from "express";
import { changeTeam, getTeam } from "../controllers/team.controller.js";
import authUser from "../middleware/auth.js";

const teamRouter = express.Router();

teamRouter.post("/change", authUser, changeTeam);
teamRouter.post("/get", authUser, getTeam);

export default teamRouter;
