import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-blue-600 text-xl font-semibold">☁ CloudControl</div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Confirm password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition">
          Create account
        </button>

        {/* Terms */}
        <div className="text-center text-xs text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Terms & Privacy
          </span>
        </div>

        {/* Login link */}
        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </Link>
        </div>


      </div>
    </div>
  )
}
