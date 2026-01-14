import heroImg from "../../assets/images/landing_page.png"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const navigate = useNavigate()

  const go = (path) => {
    navigate(path)
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-16 md:pt-28 pb-20 md:pb-32 overflow-hidden">

      {/* Soft glow */}
      <div className="absolute right-0 top-10 w-[500px] h-[500px] bg-blue-200/40 blur-[120px] rounded-full"></div>

      <div className="w-full md:max-w-7xl md:mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-blue-500">Manage AWS, Azure</span> <br />
            <span className="text-gray-900">& GCP from one</span> <br />
            <span className="text-gray-900">dashboard</span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-md mx-auto md:mx-0">
            Monitor, control and optimize all your cloud servers in one place.
          </p>

          <button
            onClick={() => go("/register")}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>

        {/* Right */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src={heroImg}
            alt="Cloud dashboard"
            className="w-full max-w-sm md:max-w-[540px] rounded-2xl shadow-2xl"
          />
        </div>

      </div>
    </div>
  )
}
