import cloud from "../../assets/icons/cloud.png"
import realtime from "../../assets/icons/backup.png"
import cost from "../../assets/icons/graph.png"
import power from "../../assets/icons/click.png"

const features = [
  {
    title: "Multi-cloud support",
    desc: "Monitor your servers and control all cloud platforms in one dashboard.",
    icon: cloud,
  },
  {
    title: "Real-time VM status",
    desc: "Monitor performance and optimize your cloud resources instantly.",
    icon: realtime,
  },
  {
    title: "Cost tracking",
    desc: "Connect costs and detect usage trends with smart automations.",
    icon: cost,
  },
  {
    title: "One-click control",
    desc: "Start, stop and manage servers directly from your dashboard.",
    icon: power,
  },
]

export default function Features() {
  return (
    <div id="features" className="mt-24 px-4 sm:px-10 lg:px-20">

      {/* Heading */}
      <div className="text-center mb-16 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900">Features</h2>
        <p className="text-gray-500 mt-2">
          Everything you need to manage your cloud in one place
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        {features.map((f) => (
          <div
            key={f.title}
            className="w-full max-w-xs bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl hover:shadow-2xl transition text-center"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-blue-100 rounded-2xl mb-5">
              <img src={f.icon} alt="" className="w-7 h-7 object-contain" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
