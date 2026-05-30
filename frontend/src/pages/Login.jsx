import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API_BASE_URL from "../config/api"
import { toast } from "react-toastify"

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "Admin",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")

    if (!form.email || !form.password) {
      toast.error("Please enter email and password")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        setLoading(false)
        toast.error(data.message || "Login failed")
        return
      }

      localStorage.setItem(
        "token",
        data.token
      )
      toast.success("Login successful")
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          role: form.role,
        })
      )

      // Role Wise Navigation
      if (form.role === "Admin") {
        navigate("/dashboard")
      }
      else if (form.role === "Developer") {
        navigate("/dashboard")
      }
      else if (form.role === "Viewer") {
        navigate("/dashboard")
      }

    } catch {
      toast.error("Server not reachable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-blue-600 text-2xl font-bold">
            ☁ CloudControl
          </div>

          <p className="text-gray-500 text-sm mt-2">
            Sign in to your account
          </p>

        </div>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-4">

            <label className="text-sm text-gray-600">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

          {/* Password */}
          <div className="mb-5">

            <label className="text-sm text-gray-600">
              Password
            </label>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

          </div>

          {/* Login Role */}
          <div className="mb-5">

            <label className="text-sm text-gray-600 block mb-2">
              Login As
            </label>

            <div className="flex gap-2">

              {[
                "Admin",
                "Developer",
                "Viewer",
              ].map((role) => (

                <button
                  key={role}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role,
                    })
                  }
                  className={`flex-1 py-2 rounded-full border text-sm font-medium transition ${form.role === role
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                >
                  {role}
                </button>

              ))}

            </div>

          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 mb-4 text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-full
            hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading
              ? "Logging in..."
              : `Login as ${form.role}`}
          </button>

        </form>

        {/* Forgot Password */}
        <div className="text-right text-sm text-gray-600 mt-4 hover:text-blue-600 cursor-pointer">
          Forgot password?
        </div>

        {/* Register */}
        <div className="text-center text-sm text-gray-600 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Create account
          </Link>

        </div>

      </div>

    </div>
  )
}