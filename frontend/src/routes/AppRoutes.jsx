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

import ProtectedRoute from "./ProtectedRoute"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clouds"
          element={
            <ProtectedRoute>
              <Clouds />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vms"
          element={
            <ProtectedRoute>
              <Vms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vm/:id"
          element={
            <ProtectedRoute>
              <VmDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Optional */}
        <Route
          path="/connect/:provider"
          element={
            <ProtectedRoute>
              <ConnectCloud />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}
