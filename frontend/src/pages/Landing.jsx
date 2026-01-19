import Hero from "../components/landing/Hero"
import Features from "../components/landing/Features"
import HowItWorks from "../components/landing/HowItWorks"
import Navbar from "../components/layout/Navbar"
import Pricing from "../components/landing/Pricing"
import { useNavigate } from "react-router-dom"

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <Navbar />

      {/* Navbar height offset */}
      <div className="pt-16">

        <div id="home">
          <Hero />
        </div>

        <div id="features" className="scroll-mt-24">
          <Features />
        </div>

        <div id="how" className="scroll-mt-24">
          <HowItWorks />
        </div>

        <div id="pricing" className="scroll-mt-24">
          <Pricing />
        </div>

        {/* CTA */}
        <div className="mx-4 sm:mx-10 lg:mx-20 my-24 rounded-3xl bg-gradient-to-r from-blue-600 to-blue-400 py-10 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Start managing your cloud in minutes
          </h2>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:scale-105 transition">
            Get Started
          </button>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-16 grid grid-cols-2 lg:grid-cols-4 gap-10 text-sm text-gray-500">

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-600">Company profiles</li>
                <li className="cursor-pointer hover:text-blue-600">CloudControl services</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Docs</h4>
              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-600">Cloud accounts</li>
                <li className="cursor-pointer hover:text-blue-600">Distributions</li>
                <li className="cursor-pointer hover:text-blue-600">Deployments</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Privacy</h4>
              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-600">About</li>
                <li className="cursor-pointer hover:text-blue-600">Privacy</li>
                <li className="cursor-pointer hover:text-blue-600">Investor agreement</li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="cursor-pointer hover:text-blue-600">Contact us</li>
                <li className="cursor-pointer hover:text-blue-600">Devops@cloudcontrol.com</li>
                <li className="cursor-pointer hover:text-blue-600">FAQ</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-200 py-6 text-center text-gray-400 text-xs">
            © 2025 CloudControl Inc. All rights reserved.
          </div>
        </footer>

      </div>
    </div>
  )
}
