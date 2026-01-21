import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API_BASE_URL from "../config/api"

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault() // 🔑 ENTER key submit handle
    setError("")

    if (!form.email || !form.password) {
      return setError("Please enter email and password")
    }

    try {
      setLoading(true)

const res = await fetch(`${API_BASE_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
})


      const data = await res.json()

      if (!res.ok) {
        setLoading(false)
        return setError(data.message || "Login failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user)) // ⭐ IMPORTANT
      navigate("/dashboard")

    } catch {
      setError("Server not reachable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">

        <div className="text-center mb-6">
          <div className="text-blue-600 text-xl font-semibold">☁ CloudControl</div>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 mb-3 text-center">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-full
            hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-right text-sm text-gray-600 mt-4 hover:text-blue-600 cursor-pointer">
          Forgot password?
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Create account
          </Link>
        </div>

      </div>
    </div>
  )
}
