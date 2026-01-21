import signup from "../../assets/icons/sign.png"
import connect from "../../assets/icons/cloud 1.png"
import manage from "../../assets/icons/browser.png"

const steps = [
  {
    title: "Sign up",
    desc: "Sign up to show your need and access our cloud, assets and services.",
    icon: signup,
  },
  {
    title: "Connect cloud",
    desc: "Connect cloud credentials on cloud providers and environments.",
    icon: connect,
  },
  {
    title: "Manage everything",
    desc: "Manage everything and view metrics, controls in one place.",
    icon: manage,
  },
]

export default function HowItWorks() {
  return (
    <div id="how" className="mt-24 px-4 sm:px-10 lg:px-20 text-center">

      <h2 className="text-3xl font-bold text-gray-900 mb-16">
        How it works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-items-center">
        {steps.map((s, i) => (
          <div key={s.title} className="max-w-xs">

            <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
              <img src={s.icon} alt="" className="w-12 md:w-14 object-contain" />
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">
              {i + 1}. {s.title}
            </h3>

            <p className="text-gray-500 text-sm leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}
