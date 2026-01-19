import { NavLink } from "react-router-dom"
import cloud_icon from "../../assets/icons/cloud 2.png"
import dashboard_icon from "../../assets/icons/dashboard.png"
import vm_icon from "../../assets/icons/vm.png"
import cost_icon from "../../assets/icons/cost.png"
import setting_icon from "../../assets/icons/setting.png"
import logout_icon from "../../assets/icons/logout.png"
import alert_icon from "../../assets/icons/alert.png"

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${isActive
    ? "bg-blue-600 text-white"
    : "text-gray-300 hover:text-white hover:bg-white/10"
  }`

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
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
        {/* Close button (mobile) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold mb-10">
          <img src={cloud_icon} className="w-7" />
          CloudControl
        </div>

        {/* Menu */}
        <div className="space-y-2 text-sm">
          <NavLink to="/dashboard" className={linkClass}>
            <img src={dashboard_icon} className="w-4" />
            Dashboard
          </NavLink>

          <NavLink to="/vms" className={linkClass}>
            <img src={vm_icon} className="w-4" />
            Virtual Machines
          </NavLink>

          <NavLink to="/clouds" className={linkClass}>
            <img src={cloud_icon} className="w-4" />
            Clouds
          </NavLink>

          <NavLink to="/billing" className={linkClass}>
            <img src={cost_icon} className="w-4" />
            Cost & Billing
          </NavLink>

          <NavLink to="/alerts" className={linkClass}>
            <img src={alert_icon} className="w-4" />
            Alerts
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            <img src={setting_icon} className="w-4" />
            Settings
          </NavLink>
        </div>

        {/* Logout */}
        <div className="mt-auto flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer">
          <img src={logout_icon} className="w-4" />
          Logout
        </div>
      </div>
    </>
  )
}
