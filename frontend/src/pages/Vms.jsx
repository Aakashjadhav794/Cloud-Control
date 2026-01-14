import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import aws from "../assets/icons/aws.png"
import azure from "../assets/icons/azure.png"
import gcp from "../assets/icons/gcp.png"
import { useNavigate } from "react-router-dom"

const vms = [
  { id: 1, cloud: "aws", name: "web-server-01", region: "us-east-1", type: "CPU", status: "Running", cost: "$8.08/hr" },
  { id: 2, cloud: "azure", name: "web-server-01", region: "us-east-1", type: "GPU", status: "Running", cost: "$8.08/hr" },
  { id: 3, cloud: "aws", name: "web-server-02", region: "us-east-1", type: "CPU", status: "Stopped", cost: "$0.00" },
  { id: 4, cloud: "gcp", name: "web-server-02", region: "us-east-1", type: "GCP", status: "Running", cost: "$3.08/hr" },
]

export default function Vms() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notifyRef = useRef()
  const menuRef = useRef()
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

    useEffect(() => {
  const close = (e) => {
    if (notifyRef.current && !notifyRef.current.contains(e.target)) {
      setShowNotifications(false)
    }
  }
  document.addEventListener("mousedown", close)
  return () => document.removeEventListener("mousedown", close)
}, [])
  const getIcon = (cloud) => {
    if (cloud === "aws") return aws
    if (cloud === "azure") return azure
    return gcp
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

<div className="flex-1 ml-0 md:ml-64">

        {/* Top Bar */}
        <div className="px-7 pt-7 bg-gray-100 sticky top-0 z-20">
<div className="flex justify-between items-center pb-4 border-b border-gray-300">
<div className="flex items-center gap-3">
  <button
    onClick={() => setSidebarOpen(true)}
    className="md:hidden p-2 rounded-lg hover:bg-gray-200"
  >
    ☰
  </button>

  <h1 className="text-2xl font-semibold text-gray-900">
    Virtual Machines
  </h1>
</div>


            <div className="flex items-center gap-4">
<div ref={notifyRef} className="relative">

  {/* Bell */}
  <div
    className="cursor-pointer"
    onClick={() => setShowNotifications(!showNotifications)}
  >
    <svg
      className="w-5 h-5 text-gray-500 hover:text-blue-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
      />
    </svg>
    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
  </div>

  {/* Dropdown */}
  {showNotifications && (
<div className="fixed top-[72px] right-3 left-3 sm:left-auto sm:right-6 w-auto sm:w-96 max-w-md bg-white rounded-2xl shadow-xl border overflow-hidden z-50">
      <div className="px-5 py-4 font-semibold text-gray-900 border-b">
        Notifications
      </div>

      <div className="divide-y">

        {/* Notification 1 */}
        <div
          onClick={() => {
            navigate("/alerts")
            setShowNotifications(false)
          }}
          className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
            ⚠
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">
              High usage on web-server-01 exceeded 95%
            </p>
            <div className="text-sm text-gray-500 mt-1 flex gap-3">
              <span className="hover:text-blue-600">Mark as read</span>
              <span className="hover:text-blue-600">Clear</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">14:03</div>
        </div>

        {/* Notification 2 */}
        <div
          onClick={() => {
            navigate("/alerts")
            setShowNotifications(false)
          }}
          className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="w-8 h-8 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full">
            ⚡
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">
              Budget exceeded: Monthly spend has crossed 80% of your limit
            </p>
            <div className="text-sm text-gray-500 mt-1 flex gap-3">
              <span className="hover:text-blue-600">Mark as read</span>
              <span className="hover:text-blue-600">Clear</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">12:30</div>
        </div>

        {/* Notification 3 */}
        <div
          onClick={() => {
            navigate("/alerts")
            setShowNotifications(false)
          }}
          className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 cursor-pointer"
        >
          <div className="w-8 h-8 bg-red-100 text-red-600 flex items-center justify-center rounded-full">
            🔔
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">
              VM stopped: db-server-02 was stopped unexpectedly
            </p>
            <div className="text-sm text-gray-500 mt-1 flex gap-3">
              <span className="hover:text-blue-600">Mark as read</span>
              <span className="hover:text-blue-600">Clear</span>
            </div>
          </div>
          <div className="text-sm text-gray-400">09:45</div>
        </div>

      </div>
    </div>
  )}
</div>
              <div className="relative" ref={menuRef}>
                <div onClick={() => setOpen(!open)} className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer" />

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm overflow-hidden z-50">
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
                    <div className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">Logout</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
<div className="p-7">

  {/* Desktop table */}
  <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
    <table className="min-w-[900px] w-full text-sm">
      <thead className="bg-gray-50 text-gray-600">
        <tr>
          <th className="text-left px-6 py-3">Cloud</th>
          <th className="text-left px-6 py-3">VM Name</th>
          <th className="text-left px-6 py-3">Region</th>
          <th className="text-left px-6 py-3">Type</th>
          <th className="text-left px-6 py-3">Status</th>
          <th className="text-left px-6 py-3">Cost</th>
          <th className="text-left px-6 py-3">Actions</th>
        </tr>
      </thead>

      <tbody>
        {vms.map(vm => (
          <tr key={vm.id} className="border-t hover:bg-gray-50">
            <td className="px-6 py-3">
              <img src={getIcon(vm.cloud)} className="w-6" />
            </td>

            <td
              onClick={() => navigate(`/vm/${vm.id}`)}
              className="px-6 py-3 text-blue-600 cursor-pointer hover:underline"
            >
              {vm.name}
            </td>

            <td className="px-6 py-3">{vm.region}</td>
            <td className="px-6 py-3">{vm.type}</td>

            <td className="px-6 py-3">
              <span
                className={`px-3 py-1 rounded-full text-xs ${
                  vm.status === "Running"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {vm.status}
              </span>
            </td>

            <td className="px-6 py-3">{vm.cost}</td>

            <td className="px-6 py-3">
              <div className="flex gap-3 text-gray-500">
                <button className="hover:text-blue-600">▶</button>
                <button className="hover:text-blue-600">⏸</button>
                <button className="hover:text-blue-600">⟳</button>
                <button className="hover:text-blue-600">⋮</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile cards */}
  <div className="md:hidden space-y-4">
    {vms.map(vm => (
<div
  key={vm.id}
  onClick={() => navigate(`/vm/${vm.id}`)}
  className="bg-white rounded-xl shadow p-4 cursor-pointer hover:bg-gray-50"
>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <img src={getIcon(vm.cloud)} className="w-6" />
            <div>
<p className="font-semibold text-blue-600">{vm.name}</p>
              <p className="text-xs text-gray-500">{vm.region}</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs ${
              vm.status === "Running"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {vm.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div>
            <p className="text-xs">Type</p>
            <p className="font-medium">{vm.type}</p>
          </div>
          <div>
            <p className="text-xs">Cost</p>
            <p className="font-medium">{vm.cost}</p>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4 text-gray-500">
          <button className="hover:text-blue-600">▶</button>
          <button className="hover:text-blue-600">⏸</button>
          <button className="hover:text-blue-600">⟳</button>
          <button className="hover:text-blue-600">⋮</button>
        </div>

      </div>
    ))}
  </div>

</div>

        {profileOpen && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6 relative">

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
      A
    </div>
    <div>
      <div className="font-semibold text-gray-900">Aakash Choudhary</div>
      <div className="text-sm text-gray-500">aakash@cloudcontrol.io</div>
    </div>
  </div>

  <div className="border-t pt-4 space-y-3 text-sm">
    <div className="flex justify-between">
      <span className="text-gray-500">Role</span>
      <span className="font-medium text-gray-900">Admin</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Organization</span>
      <span className="font-medium text-gray-900">CloudControl</span>
    </div>

    <div className="flex justify-between">
      <span className="text-gray-500">Member since</span>
      <span className="font-medium text-gray-900">Jan 2025</span>
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
