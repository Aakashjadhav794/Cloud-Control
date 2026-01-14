import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"

import aws from "../assets/icons/aws.png"
import azure from "../assets/icons/azure.png"
import gcp from "../assets/icons/gcp.png"

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notifyRef = useRef()
  const navigate = useNavigate()
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

  const usageData = [
    { month: "Jan", resource: 300, usage: 180 },
    { month: "Feb", resource: 420, usage: 250 },
    { month: "Mar", resource: 350, usage: 220 },
    { month: "Apr", resource: 480, usage: 310 },
    { month: "May", resource: 500, usage: 290 },
    { month: "Jun", resource: 620, usage: 420 },
    { month: "Jul", resource: 550, usage: 330 },
    { month: "Aug", resource: 680, usage: 450 },
    { month: "Sep", resource: 600, usage: 380 },
    { month: "Oct", resource: 640, usage: 410 },
  ]

  const clouds = [
    { name: "AWS", icon: aws, vms: 12, usd: 540.2 },
    { name: "Azure", icon: azure, vms: 8, usd: 320.1 },
    { name: "GCP", icon: gcp, vms: 5, usd: 385.3 },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
<Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
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

  <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
</div>


            <div className="flex items-center gap-6">
<div className="hidden sm:block text-sm text-gray-600">
  Total monthly cost:
  <span className="font-semibold text-gray-900 ml-2">$1,245.50</span>
</div>
              <div className="flex items-center gap-4">

                {/* Notification */}
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


                {/* Avatar */}
                <div className="relative" ref={menuRef}>
                  <div
                    onClick={() => setOpen(!open)}
                    className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer"
                  />

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
                      <div className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
                        Logout
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-7">

          {/* Cloud Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {clouds.map((c) => {
              const inr = (c.usd * 83).toFixed(0)

              return (
                <div
                  key={c.name}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-md"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={c.icon} className="w-8" />
                    <h3 className="font-semibold text-gray-900">{c.name}</h3>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Status</span>
                    <span className="text-green-600 font-medium">Connected</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>VMs</span>
                    <span className="font-medium text-gray-900">{c.vms}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Cost</span>
                    <span className="font-semibold text-gray-900">
                      ${c.usd.toFixed(2)}
                      <span className="text-gray-500 text-xs ml-1">(₹{inr})</span>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Resource Usage */}
          <div className="bg-white p-6 rounded-2xl shadow mb-10">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Resource usage</h2>
              <div className="flex gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-300"></span> Resource
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> Usage
                </div>
              </div>
            </div>

<div className="h-64 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="resource" stroke="#CBD5E1" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="usage" stroke="#3B82F6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="font-semibold mb-4">Recent activity</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>Remove usage – 14 minutes ago</div>
              <div>Recent activity – 14 minutes ago</div>
              <div>Reorder resource – 14 minutes ago</div>
              <div>Recent activity – 14 minutes ago</div>
            </div>
          </div>
{profileOpen && (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] max-w-[420px] rounded-2xl p-6 shadow-xl p-6 relative">

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
    </div>
  )
}
