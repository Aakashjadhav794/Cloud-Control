import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (id) => {
    setOpen(false)
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const go = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <div className="w-full bg-white/70 backdrop-blur-xl border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

          <div
            onClick={() => go("/")}
            className="flex items-center gap-2 text-blue-600 font-semibold text-lg cursor-pointer"
          >
            ☁ CloudControl
          </div>

          <div className="hidden md:flex items-center gap-10 text-gray-600 text-sm font-medium">
            <span onClick={() => scrollTo("features")} className="cursor-pointer hover:text-blue-600">Features</span>
            <span onClick={() => scrollTo("pricing")} className="cursor-pointer hover:text-blue-600">Pricing</span>
            <span onClick={() => scrollTo("how")} className="cursor-pointer hover:text-blue-600">Docs</span>
            <span onClick={() => go("/login")} className="cursor-pointer hover:text-blue-600">Login</span>
            <button onClick={() => go("/register")} className="ml-4 bg-blue-600 text-white px-5 py-2 rounded-full">
              Get Started
            </button>
          </div>

          <button onClick={() => setOpen(true)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* Slide menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6 text-gray-700">
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-semibold">☁ CloudControl</div>
            <button onClick={() => setOpen(false)} className="text-2xl">×</button>
          </div>

          <div onClick={() => scrollTo("features")} className="cursor-pointer">Features</div>
          <div onClick={() => scrollTo("pricing")} className="cursor-pointer">Pricing</div>
          <div onClick={() => scrollTo("how")} className="cursor-pointer">Docs</div>
          <div onClick={() => go("/login")} className="cursor-pointer">Login</div>

          <button
            onClick={() => go("/register")}
            className="w-full bg-blue-600 text-white py-3 rounded-full"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  )
}
