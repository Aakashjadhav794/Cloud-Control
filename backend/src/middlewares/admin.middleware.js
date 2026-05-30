import User from "../models/user.model.js"

export const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user || user.role !== "Admin") {
    return res.status(403).json({
      message: "Admin access required",
    })
  }

  next()
}