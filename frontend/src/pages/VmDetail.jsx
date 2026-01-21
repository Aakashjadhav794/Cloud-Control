import { useParams, useNavigate } from "react-router-dom"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import aws from "../assets/icons/aws.png"
import azure from "../assets/icons/azure.png"
import gcp from "../assets/icons/gcp.png"

const vmData = {
  "1": {
    name: "web-server-01",
    cloud: "aws",
    region: "us-east-1",
    status: "Running",
    type: "CPU",
    ip: "192.168.1.22",
    cost: "$8.08/hr",
  },
  "2": {
    name: "web-server-01",
    cloud: "azure",
    region: "us-east-1",
    status: "Running",
    type: "GPU",
    ip: "192.168.1.34",
    cost: "$8.08/hr",
  },
  "3": {
    name: "web-server-02",
    cloud: "aws",
    region: "us-east-1",
    status: "Stopped",
    type: "CPU",
    ip: "192.168.1.55",
    cost: "$0.00",
  },
}

const usage = [
  { time: "10AM", cpu: 30 },
  { time: "12PM", cpu: 45 },
  { time: "2PM", cpu: 55 },
  { time: "4PM", cpu: 40 },
  { time: "6PM", cpu: 60 },
]

export default function VmDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const vm = vmData[id]

  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const getIcon = () => {
    if (vm.cloud === "aws") return aws
    if (vm.cloud === "azure") return azure
    return gcp
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 ml-0 md:ml-64">
        {/* Top Bar (Dashboard style) */}
        <div className="px-7 pt-7 bg-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              >
                ☰
              </button>
              <h1 className="text-2xl font-semibold">{vm.name}</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer">
                <svg className="w-5 h-5 text-gray-500 hover:text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" />
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setOpen(!open)}
                  className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer"
                />

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm overflow-hidden z-50">
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                    <div className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">Logout</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 space-y-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            ← Back to Virtual Machines
          </button>
          {/* Header Card */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-6 rounded-2xl shadow">
            <img src={getIcon()} alt="" className="w-10" />
            <div>
              <h2 className="text-xl font-semibold">{vm.name}</h2>
              <p className="text-sm text-gray-500">{vm.region} • {vm.type}</p>
            </div>
            <span className={`sm:ml-auto px-4 py-1 rounded-full text-sm ${vm.status === "Running"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
              }`}>
              {vm.status}
            </span>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-500">Public IP</p>
              <p className="font-semibold">{vm.ip}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-semibold">{vm.type}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-500">Region</p>
              <p className="font-semibold">{vm.region}</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-gray-500">Cost</p>
              <p className="font-semibold">{vm.cost}</p>
            </div>
          </div>

          {/* CPU Chart */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-4">CPU Usage</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usage}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cpu"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700">Start</button>
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600">Restart</button>
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700">Stop</button>
          </div>

        </div>
      </div>
    </div>
  )
}
