import { NavLink, useNavigate } from "react-router-dom"
import cloud_icon from "../../assets/icons/cloud 2.png"
import dashboard_icon from "../../assets/icons/dashboard.png"
import vm_icon from "../../assets/icons/vm.png"
import cost_icon from "../../assets/icons/cost.png"
import setting_icon from "../../assets/icons/setting.png"
import logout_icon from "../../assets/icons/logout.png"
import alert_icon from "../../assets/icons/alert.png"
import access_icon from "../../assets/icons/access.png"
import { toast } from "react-toastify"

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:text-white hover:bg-white/10"
  }`

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))
  const role = user?.role

const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  toast.success("Logged out successfully")

  onClose?.()

  setTimeout(() => {
    navigate("/login")
  }, 1000)
}

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0F172A] text-white p-6 flex flex-col
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold mb-10">
          <img src={cloud_icon} alt="" className="w-7" />
          CloudControl
        </div>

        {/* Menu */}
        <div className="space-y-2 text-sm">

          {/* Dashboard - All Users */}
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={linkClass}
          >
            <img src={dashboard_icon} alt="" className="w-4" />
            Dashboard
          </NavLink>

          {/* Virtual Machines - Admin & Developer */}
          {(role === "Admin" || role === "Developer") && (
            <NavLink
              to="/vms"
              onClick={onClose}
              className={linkClass}
            >
              <img src={vm_icon} alt="" className="w-4" />
              Virtual Machines
            </NavLink>
          )}

          {/* Clouds - Admin & Developer */}
          {(role === "Admin" || role === "Developer") && (
            <NavLink
              to="/clouds"
              onClick={onClose}
              className={linkClass}
            >
              <img src={cloud_icon} alt="" className="w-4" />
              Clouds
            </NavLink>
          )}

          {/* Billing - Admin & Viewer */}
          {(role === "Admin" || role === "Viewer") && (
            <NavLink
              to="/billing"
              onClick={onClose}
              className={linkClass}
            >
              <img src={cost_icon} alt="" className="w-4" />
              Cost & Billing
            </NavLink>
          )}

          {/* Access Management - Admin Only */}
          {role === "Admin" && (
            <NavLink
              to="/accessmanagement"
              onClick={onClose}
              className={linkClass}
            >
              <img src={access_icon} alt="" className="w-4" />
              Access Management
            </NavLink>
          )}

          {/* Alerts - All Users */}
          <NavLink
            to="/alerts"
            onClick={onClose}
            className={linkClass}
          >
            <img src={alert_icon} alt="" className="w-4" />
            Alerts
          </NavLink>

          {/* Settings - Admin Only */}
          {role === "Admin" && (
            <NavLink
              to="/settings"
              onClick={onClose}
              className={linkClass}
            >
              <img src={setting_icon} alt="" className="w-4" />
              Settings
            </NavLink>
          )}

        </div>

        {/* Logout */}
        <div
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
        >
          <img src={logout_icon} alt="" className="w-4" />
          Logout
        </div>
      </div>
    </>
  )
}