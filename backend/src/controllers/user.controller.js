import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body

    const exists = await User.findOne({ email })

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    })

    res.status(201).json({
      message: "User created successfully",
      user,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password")
  res.json(users)
}

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)

  res.json({
    message: "User deleted",
  })
}

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    const match = await bcrypt.compare(
      password,
      user.password
    )

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
      })
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `You are not registered as ${role}`,
      })
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
    res.status(500).json({
      message: "Server error",
    })
  }
}
export const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      status,
      password,
    } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      })
    }

    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.email = email || user.email
    user.role = role || user.role
    user.status = status || user.status

    // password change
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10)
    }

    await user.save()

    res.json({
      message: "User updated successfully",
      user,
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: "Server error",
    })
  }
}