import express from "express";
import { changeTeam } from "../controllers/team.controller.js";
import authUser from "../middleware/auth.js";

const teamRouter = express.Router();

teamRouter.post("/change", authUser, changeTeam);

export default teamRouter;
