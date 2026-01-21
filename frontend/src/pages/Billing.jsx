import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

import awsIcon from "../assets/icons/aws.png"
import azureIcon from "../assets/icons/azure.png"
import gcpIcon from "../assets/icons/gcp.png"
import { useNavigate } from "react-router-dom"

/* ===== DATA ===== */

const monthlyCost = [
  { month: "Apr", aws: 3200, azure: 2100, gcp: 1800 },
  { month: "May", aws: 4100, azure: 2600, gcp: 2400 },
  { month: "Jun", aws: 3800, azure: 2900, gcp: 2700 },
  { month: "Jul", aws: 4500, azure: 3100, gcp: 3000 },
  { month: "Aug", aws: 3900, azure: 2800, gcp: 2600 },
  { month: "Sep", aws: 3700, azure: 3000, gcp: 2900 },
]

const usage = [
  { day: "Thu", usage: 40 },
  { day: "Mon", usage: 50 },
  { day: "Wed", usage: 45 },
  { day: "Fri", usage: 60 },
  { day: "Sun", usage: 55 },
  { day: "Sat", usage: 70 },
]

/* ===== Custom Tooltip with Logos ===== */

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null

  const icons = {
    aws: awsIcon,
    azure: azureIcon,
    gcp: gcpIcon,
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 border text-sm">
      <div className="font-semibold mb-2">{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <img src={icons[p.dataKey]} className="w-4 h-4" />
          <span className="capitalize">{p.dataKey}</span>
          <span className="ml-auto font-medium">${p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Billing() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const [showNotifications, setShowNotifications] = useState(false)
  const notifyRef = useRef()
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
  useEffect(() => {
    const close = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64 w-full overflow-x-hidden">
        {/* ===== TOP BAR ===== */}
        <div className="px-7 pt-7 bg-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              >
                ☰
              </button>

              <h1 className="text-2xl font-semibold">Cost & Billing</h1>
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
                <div
                  onClick={() => setOpen(!open)}
                  className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
                >
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
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
        </div>

        {/* ===== PAGE CONTENT ===== */}
        <div className="p-7 space-y-8">

          {/* ===== KPI CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Total Monthly Cost</p>
              <h3 className="text-2xl font-semibold">$1,245.50</h3>
              <p className="text-sm text-gray-500">₹103,379</p>
              <p className="text-xs text-green-600 mt-1">+5%</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Budget Status</p>
              <h3 className="text-2xl font-semibold">$1,500.00</h3>
              <p className="text-sm text-gray-500">₹124,500</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-2 w-[83%] bg-green-500 rounded-full"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">83% used</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Forecasted Spend</p>
              <h3 className="text-2xl font-semibold">$1,350.00</h3>
              <p className="text-sm text-gray-500">₹112,050</p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow">
              <p className="text-sm text-gray-500">Last Month</p>
              <h3 className="text-2xl font-semibold">$1,180.25</h3>
              <p className="text-sm text-gray-500">₹97,961</p>
            </div>
          </div>


          {/* ===== CHARTS ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Monthly cost per cloud</h3>

              <div className="h-52 w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" className="!w-full">
                  <BarChart data={monthlyCost}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="aws" stackId="a" fill="#2563EB" />
                    <Bar dataKey="azure" stackId="a" fill="#93C5FD" />
                    <Bar dataKey="gcp" stackId="a" fill="#FBBF24" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img src={awsIcon} className="w-4" /> AWS
                </div>
                <div className="flex items-center gap-2">
                  <img src={azureIcon} className="w-4" /> Azure
                </div>
                <div className="flex items-center gap-2">
                  <img src={gcpIcon} className="w-4" /> GCP
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Total usage</h3>
              <div className="h-52 w-full overflow-hidden">
                <ResponsiveContainer width="100%" height="100%" className="!w-full !max-w-full">
                  <LineChart data={usage}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="usage" stroke="#3B82F6" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ===== CLOUD COST CARDS ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
              <img src={awsIcon} className="w-10" />
              <div>
                <h4 className="text-sm text-gray-500">AWS cost</h4>
                <div className="text-2xl font-semibold">$540.20</div>
                <div className="text-sm text-gray-500">₹44,835</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
              <img src={azureIcon} className="w-10" />
              <div>
                <h4 className="text-sm text-gray-500">Azure cost</h4>
                <div className="text-2xl font-semibold">$320.10</div>
                <div className="text-sm text-gray-500">₹26,568</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
              <img src={gcpIcon} className="w-10" />
              <div>
                <h4 className="text-sm text-gray-500">GCP cost</h4>
                <div className="text-2xl font-semibold">$385.20</div>
                <div className="text-sm text-gray-500">₹31,971</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">Cost by Service</h3>
            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full text-sm">
                <thead className="text-gray-500 border-b">
                  <tr>
                    <th className="text-left py-2">Service Name</th>
                    <th className="text-left py-2">Cloud Provider</th>
                    <th className="text-left py-2">Usage Type</th>
                    <th className="text-right py-2">Cost</th>
                    <th className="text-right py-2">Change</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  <tr>
                    <td className="py-3">AWS Source Service</td>
                    <td className="py-3 flex items-center gap-2">
                      <img src={awsIcon} className="w-4" /> AWS
                    </td>
                    <td className="py-3">Compute usage</td>
                    <td className="py-3 text-right">$1,245.50</td>
                    <td className="py-3 text-right text-red-500">-5%</td>
                  </tr>

                  <tr>
                    <td className="py-3">Azure Cloud Service</td>
                    <td className="py-3 flex items-center gap-2">
                      <img src={azureIcon} className="w-4" /> Azure
                    </td>
                    <td className="py-3">Azure usage</td>
                    <td className="py-3 text-right">$1,360.00</td>
                    <td className="py-3 text-right text-green-500">+5%</td>
                  </tr>

                  <tr>
                    <td className="py-3">GCP Infra Service</td>
                    <td className="py-3 flex items-center gap-2">
                      <img src={gcpIcon} className="w-4" /> GCP
                    </td>
                    <td className="py-3">Storage & Compute</td>
                    <td className="py-3 text-right">$323.50</td>
                    <td className="py-3 text-right text-gray-400">0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Invoices */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-semibold mb-4">Recent Invoices</h3>

              <div className="flex justify-between items-center py-2 border-b">
                <span>Invoice – Oct 2024</span>
                <button className="text-blue-600 text-sm">PDF</button>
              </div>

              <div className="flex justify-between items-center py-2 border-b">
                <span>Invoice – Sep 2024</span>
                <button className="text-blue-600 text-sm">PDF</button>
              </div>

              <div className="flex justify-between items-center py-2">
                <span>Invoice – Aug 2024</span>
                <button className="text-blue-600 text-sm">PDF</button>
              </div>
            </div>

            {/* Cost Allocation Tags */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between mb-4">
                <h3 className="font-semibold">Cost Allocation Tags</h3>
                <button className="text-blue-600 text-sm">+ Manage Tags</button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">marketing</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">backend</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">aws-prod</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">azure-dev</span>
              </div>
            </div>

          </div>

          {/* ===== ALERT SETUP ===== */}
          <div className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-2">Alert setup</h4>
              <label className="text-sm text-gray-500">Set monthly limit</label>
              <div className="flex gap-3 mt-2">
                <input className="border px-3 py-2 rounded-lg w-32" placeholder="$0" />
                <select className="border px-3 py-2 rounded-lg">
                  <option>monthly</option>
                  <option>weekly</option>
                </select>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Notification preferences</h4>
              <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                <input type="checkbox" defaultChecked />
                Notification inbox
              </div>
            </div>
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
    </div>
  )
}
