import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import eyeIcon from "../assets/icons/eye.svg"

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      return setError("All fields are required")
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setLoading(true)

      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLoading(false)
        return setError(data.message || "Registration failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setSuccess("Account created successfully 🎉 Redirecting...")
      setTimeout(() => navigate("/welcome"), 1500)
    }catch (err) {
  console.error(err)
  setError("Server not reachable")
}
 finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">

        <div className="text-center mb-6">
          <div className="text-blue-600 text-xl font-semibold">
            ☁ CloudControl
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* First + Last */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">First name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-600">Last name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
          </div>

          {/* Password */}
<div className="mb-4 relative">
  <label className="text-sm text-gray-600">Password</label>

  <input
    name="password"
    type={showPassword ? "text" : "password"}
    value={form.password}
    onChange={handleChange}
    className={inputClass}
  />

  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-9 w-5 h-5 cursor-pointer"
  >
    <img src={eyeIcon} className="w-5 h-5 opacity-70" />

    {/* Slash when hidden */}
    {!showPassword && (
      <span className="absolute inset-0">
        <span className="absolute w-[140%] h-[2px] bg-gray-500 rotate-45 top-1/2 left-[-20%]" />
      </span>
    )}
  </div>
</div>


          {/* Confirm Password */}
<div className="mb-4 relative">
  <label className="text-sm text-gray-600">Confirm password</label>

  <input
    name="confirmPassword"
    type={showConfirm ? "text" : "password"}
    value={form.confirmPassword}
    onChange={handleChange}
    className={inputClass}
  />

  <div
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-3 top-9 w-5 h-5 cursor-pointer"
  >
    <img src={eyeIcon} className="w-5 h-5 opacity-70" />

    {/* Slash when hidden */}
    {!showConfirm && (
      <span className="absolute inset-0">
        <span className="absolute w-[140%] h-[2px] bg-gray-500 rotate-45 top-1/2 left-[-20%]" />
      </span>
    )}
  </div>
</div>


          {success && (
            <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-center">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  )
}
