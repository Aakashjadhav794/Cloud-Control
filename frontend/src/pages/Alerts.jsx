import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import { useNavigate } from "react-router-dom"

const alerts = [
  {
    title: "High usage",
    desc: "CPU usage on web-server-01 exceeded 90%",
    time: "Yesterday, 6:17 AM",
    severity: "warning",
  },
  {
    title: "VM stopped",
    desc: "db-server-02 was stopped unexpectedly",
    time: "Thursday, 6:42 AM",
    severity: "error",
  },
  {
    title: "Budget exceeded",
    desc: "Monthly spend has crossed 80% of your limit",
    time: "Tuesday, 4:41 PM",
    severity: "warning",
  },
]

export default function Alerts() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64">
        {/* Top Bar */}
        <div className="px-7 pt-7 bg-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              >
                ☰
              </button>

              <h1 className="text-2xl font-semibold">Alerts</h1>
            </div>
            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
              >
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm">
                  <div
                    onClick={() => {
                      setProfileOpen(true)
                      setOpen(false)
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </div>
                  <div
                    onClick={() => {
                      setOpen(false)
                      navigate("/settings")
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </div>
                  <div
                    onClick={handleLogout}
                    className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-6">
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-2xl shadow flex justify-between items-center ${a.severity === "error" ? "border-l-4 border-red-500" : "border-l-4 border-yellow-400"
                }`}
            >
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{a.time}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${a.severity === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {a.severity}
              </span>
            </div>
          ))}
        </div>
        {/* Profile Modal */}
        {profileOpen && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-[420px] rounded-2xl p-6 shadow-xl relative">

              <button
                onClick={() => setProfileOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-4">Your profile</h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {user?.name || "User"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user?.email || "email@example.com"}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Role</span>
                    <span className="font-medium text-gray-900">
                      {user?.role || "Member"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Organization</span>
                    <span className="font-medium text-gray-900">
                      CloudControl
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Member since</span>
                    <span className="font-medium text-gray-900">
                      Jan 2025
                    </span>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
