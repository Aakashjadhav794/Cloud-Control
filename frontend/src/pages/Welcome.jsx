import { useNavigate } from "react-router-dom"
import aws from "../assets/icons/aws_white.png"
import azure from "../assets/icons/azure_white.png"
import gcp from "../assets/icons/gcp.png"

export default function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl text-center">

        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Welcome to CloudControl
        </h2>

        <button
          onClick={() => navigate("/connect/aws")}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 rounded-full hover:bg-blue-700 transition mb-4"
        >
          <img src={aws} className="w-7 h-7" />
          Connect AWS
        </button>

        <button
          onClick={() => navigate("/connect/azure")}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 rounded-full hover:bg-blue-700 transition mb-4"
        >
          <img src={azure} className="w-7 h-7" />
          Connect Azure
        </button>

        <button
          onClick={() => navigate("/connect/gcp")}
          className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-3 rounded-full hover:bg-blue-700 transition"
        >
          <img src={gcp} className="w-7 h-7" />
          Connect GCP
        </button>
        <div
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-600 mt-6 cursor-pointer hover:text-blue-600"
        >
          You can add more later
        </div>

      </div>
    </div>
  )
}
