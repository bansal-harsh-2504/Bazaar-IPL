import User from "../models/user.model.js";

export const changeTeam = async (req, res) => {
  try {
    const { team, userId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { iplTeam: team });
    await user.save();

    res.json({
      success: true,
      message: "Team changed successfully",
      iplTeam: team,
    });
  } catch (error) {
    console.log("Error in Team change Conltroller : ", error.message);
    res.json({ success: false, message: "Internal Server Error" });
  }
};
