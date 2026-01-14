import { useState } from "react"
import aws from "../../assets/icons/aws.png"
import azure from "../../assets/icons/azure.png"
import gcp from "../../assets/icons/gcp.png"

const regions = ["us-east-1", "us-west-1", "ap-south-1"]

export default function ConnectCloudModal({ onClose }) {
  const [tab, setTab] = useState("aws")
  const [region, setRegion] = useState("")
  const [open, setOpen] = useState(false)
  const [gcpFile, setGcpFile] = useState(null)

  const tabStyle = (name) =>
    `flex items-center gap-2 pb-2 cursor-pointer ${
      tab === name
        ? "font-semibold text-blue-600 border-b-2 border-blue-600"
        : "text-gray-400"
    }`

  const inputClass =
    "w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-6 mb-8 border-b pb-3">
        <div onClick={() => setTab("aws")} className={tabStyle("aws")}>
          <img src={aws} className="w-6" /> AWS
        </div>
        <div onClick={() => setTab("azure")} className={tabStyle("azure")}>
          <img src={azure} className="w-6" /> Azure
        </div>
        <div onClick={() => setTab("gcp")} className={tabStyle("gcp")}>
          <img src={gcp} className="w-6" /> GCP
        </div>
      </div>

      <h3 className="text-gray-800 font-medium mb-4 capitalize">
        {tab} account details
      </h3>

      <div className="space-y-4">

        <div>
          <label className="text-sm text-gray-600">Account name</label>
          <input className={inputClass} />
        </div>

        {tab !== "gcp" && (
          <>
            <div>
              <label className="text-sm text-gray-600">Access Key</label>
              <input className={inputClass} />
            </div>

            <div>
              <label className="text-sm text-gray-600">Secret Key</label>
              <input type="password" className={inputClass} />
            </div>
          </>
        )}

        {tab === "gcp" && (
          <div>
            <label className="text-sm text-gray-600">
              Service Account JSON
            </label>

            <label className="mt-2 flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-xl cursor-pointer bg-white hover:border-blue-500 transition">
              <span className="text-gray-500 text-sm">
                {gcpFile ? gcpFile.name : "Upload service account JSON"}
              </span>
              <span className="text-blue-600 text-sm font-medium">Browse</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => setGcpFile(e.target.files[0])}
              />
            </label>
          </div>
        )}

        {/* Region */}
        <div className="relative">
          <label className="text-sm text-gray-600">Region</label>
          <div
            onClick={() => setOpen(!open)}
            className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-xl bg-white cursor-pointer flex justify-between items-center"
          >
            <span className={region ? "text-gray-900" : "text-gray-400"}>
              {region || "Select region"}
            </span>
            <span>▾</span>
          </div>

          {open && (
            <div className="absolute mt-2 w-full bg-white border rounded-xl shadow">
              {regions.map((r) => (
                <div
                  key={r}
                  onClick={() => {
                    setRegion(r)
                    setOpen(false)
                  }}
                  className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-full mt-6 hover:bg-blue-700 transition"
        >
          Connect {tab.toUpperCase()}
        </button>
      </div>
    </>
  )
}
