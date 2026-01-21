import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../utils/jwt.js"

/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body

    // 1. Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // 2. Check existing user
    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "Email already registered" })
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4. Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "Admin",
    })

    // 5. Token
    const token = generateToken(user._id)

    // 6. Response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("REGISTER ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    console.error("LOGIN ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
}

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body

    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.email = email || user.email

    await user.save()

    res.json({
      message: "Profile updated",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

/* CHANGE PASSWORD */
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: "User not found" })

    const match = await bcrypt.compare(currentPassword, user.password)
    if (!match) {
      return res.status(400).json({ message: "Current password incorrect" })
    }

    user.password = await bcrypt.hash(newPassword, 10)
    await user.save()

    res.json({ message: "Password updated successfully" })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
}