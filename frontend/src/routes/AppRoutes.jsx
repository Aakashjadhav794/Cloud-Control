import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "../pages/Landing"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Welcome from "../pages/Welcome"
import ConnectCloud from "../pages/ConnectCloud"
import Dashboard from "../pages/Dashboard"
import Vms from "../pages/Vms"
import Clouds from "../pages/Clouds"
import Billing from "../pages/Billing"
import Alerts from "../pages/Alerts"
import VmDetail from "../pages/VmDetail"
import Settings from "../pages/Settings"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/connect/:provider" element={<ConnectCloud />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vms" element={<Vms />} />
        <Route path="/clouds" element={<Clouds />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/vm/:id" element={<VmDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}
