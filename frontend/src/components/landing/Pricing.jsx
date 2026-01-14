import { useState } from "react"

export default function Pricing() {
  const [active, setActive] = useState("Pro")

  const plans = [
    {
      name: "Basic",
      tag: "Free",
      price: "$0",
      period: "/mo",
      desc: "For individuals",
      features: ["1 Cloud Account", "5 VMs", "Basic Monitoring"],
      button: "Get Started",
    },
    {
      name: "Pro",
      tag: "Most Popular",
      price: "$49",
      period: "/mo",
      desc: "For small teams",
      features: [
        "3 Cloud Accounts",
        "50 VMs",
        "Advanced Monitoring",
        "Cost Alerts",
      ],
      button: "Try Pro",
    },
    {
      name: "Enterprise",
      tag: "",
      price: "Custom",
      period: "Pricing",
      desc: "For large organizations",
      features: [
        "Unlimited Clouds",
        "Unlimited VMs",
        "Dedicated Support",
        "Custom Integrations",
      ],
      button: "Contact Sales",
    },
  ]

  return (
    <div id="pricing" className="mt-24 px-4 sm:px-10 lg:px-20">

      {/* Heading */}
      <div className="text-center mb-16 max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-500 mt-3">
          Choose the plan that fits your cloud needs.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {plans.map((p) => {
          const isActive = active === p.name

          return (
            <div
              key={p.name}
              onClick={() => setActive(p.name)}
              className={`cursor-pointer rounded-3xl p-6 md:p-8 bg-white transition-all duration-300
                ${
                  isActive
                    ? "border-2 border-blue-600 shadow-2xl scale-105"
                    : "border border-gray-200 shadow-lg hover:shadow-2xl hover:scale-105"
                }`}
            >
              {/* Header */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {p.name}{" "}
                  {p.tag && (
                    <span className="text-blue-600 text-sm">({p.tag})</span>
                  )}
                </h2>

                <p className="text-gray-500 mt-1 text-sm">{p.desc}</p>

                <div className="mt-4 md:mt-6 text-3xl md:text-4xl font-bold text-gray-900">
                  {p.price}
                  <span className="text-lg text-gray-500">{p.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 text-gray-600 text-sm">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="text-blue-600">✓</span>
                    {f}
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                className={`w-full mt-6 md:mt-10 py-2.5 md:py-3 rounded-full font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-blue-50"
                  }`}
              >
                {p.button}
              </button>
            </div>
          )
        })}
      </div>

    </div>
  )
}
