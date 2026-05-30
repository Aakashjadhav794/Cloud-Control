import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"

export default function AccessManagement() {

  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("developers")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState("")
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [editData, setEditData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    status: "Active",
    password: "",
  })
  const [isChanged, setIsChanged] = useState(false)
  const [developerData, setDeveloperData] = useState([])
  const [viewerData, setViewerData] = useState([])
  const [search, setSearch] = useState("")
  const [showAddUser, setShowAddUser] = useState(false)
  const [roleDropdown, setRoleDropdown] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Developer",
    invite: false,
  })
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const menuRef = useRef()
  const roleRef = useRef()
  const [editRoleDropdown, setEditRoleDropdown] = useState(false)
  const editRoleRef = useRef()

  useEffect(() => {

    const closeEditDropdown = (e) => {

      if (
        editRoleRef.current &&
        !editRoleRef.current.contains(e.target)
      ) {
        setEditRoleDropdown(false)
      }

    }

    document.addEventListener(
      "mousedown",
      closeEditDropdown
    )

    return () =>
      document.removeEventListener(
        "mousedown",
        closeEditDropdown
      )

  }, [])
  const navigate = useNavigate()
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        "http://localhost:5000/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      setDeveloperData(
        data.filter(
          (user) => user.role === "Developer"
        )
      )

      setViewerData(
        data.filter(
          (user) => user.role === "Viewer"
        )
      )

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem("token")

      if (
        !newUser.firstName ||
        !newUser.lastName ||
        !newUser.email ||
        !newUser.password
      ) {
        return toast.error("All fields are required")
      }

      if (
        newUser.password !==
        newUser.confirmPassword
      ) {
        return toast.error("Passwords do not match")
      }

      const res = await fetch(
        "http://localhost:5000/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
          }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        return toast.error(data.message)
      }

      fetchUsers()
      toast.success("User created successfully")
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Developer",
        invite: false,
      })

      setShowAddUser(false)

    } catch (err) {
      console.log(err)
      toast.error("Failed to create user")
    }
  }
  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("token")

      console.log("TOKEN:", token)
      console.log("USER ID:", editData.id)

      const res = await fetch(
        `http://localhost:5000/users/${editData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: editData.firstName,
            lastName: editData.lastName,
            email: editData.email,
            role: editData.role,
            status: editData.status,
            password: editData.password,
          }),
        }
      )

      console.log("Status:", res.status)

      const text = await res.text()

      console.log("Response:", text)

      if (!res.ok) {
        return alert(`Error: ${text}`)
      }

      fetchUsers()

      setShowPopup(false)

      toast.success("User updated successfully")
    } catch (err) {
      console.error(err)
      toast.error("Failed to update user")
    }
  }

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `http://localhost:5000/users/${deleteUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await res.json()

      if (!res.ok) {
        return toast.error(data.message)
      }

      fetchUsers()

      setShowDeleteModal(false)
      setDeleteUserId(null)

      toast.success("User deleted successfully")
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete user")
    }
  }
  const user = JSON.parse(localStorage.getItem("user"))

const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  toast.success("Logged out successfully")

  setTimeout(() => {
    navigate("/login")
  }, 1000)
}

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", close)

    return () =>
      document.removeEventListener("mousedown", close)
  }, [])
  useEffect(() => {

    const closeDropdown = (e) => {

      if (
        roleRef.current &&
        !roleRef.current.contains(e.target)
      ) {
        setRoleDropdown(false)
      }

    }

    document.addEventListener("mousedown", closeDropdown)

    return () =>
      document.removeEventListener(
        "mousedown",
        closeDropdown
      )

  }, [])
  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-green-100 text-green-700"
    }

    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700"
    }

    return "bg-red-100 text-red-700"
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 ml-0 md:ml-64">

        {/* Top Bar */}
        <div className="px-4 sm:px-5 lg:px-7 pt-4 sm:pt-5 lg:pt-7 bg-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300">

            {/* Left */}
            <div className="flex items-center gap-3">

              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              >
                ☰
              </button>

              <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                Access Management
              </h1>

            </div>

            {/* Right */}
            <div className="relative" ref={menuRef}>

              <div
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
              >
                {user?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg text-sm overflow-hidden z-50">

                  <div
                    onClick={() => {
                      setProfileOpen(true)
                      setOpen(false)
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </div>

                  <div
                    onClick={() => {
                      setOpen(false)
                      navigate("/settings")
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </div>

<div
  onClick={() => setShowLogoutModal(true)}
  className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer"
>
  Logout
</div>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-5 lg:p-7">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-5 mb-6">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Team Access
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage users, permissions, and access roles.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">

              <input
                type="text"
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2.5 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-[320px] lg:w-[420px]"
              />
              <button
                onClick={() => setShowAddUser(true)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition w-full md:w-[140px]"
              >
                + Add User
              </button>

            </div>

          </div>

          {/* Tabs */}
          <div className="flex gap-5 sm:gap-8 border-b border-gray-300 mb-6 overflow-x-auto">

            <button
              onClick={() => setActiveTab("developers")}
              className={`pb-3 text font-semibold transition ${activeTab === "developers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
            >
              Developers
            </button>

            <button
              onClick={() => setActiveTab("viewers")}
              className={`pb-3 text font-semibold transition ${activeTab === "viewers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
                }`}
            >
              Viewers
            </button>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-6">

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">
              <p className="text-gray-500 font-medium">
                {activeTab === "developers"
                  ? "Total Developers"
                  : "Total Viewers"}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                {(activeTab === "developers"
                  ? developerData
                  : viewerData
                ).length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">
              <p className="text-gray-500 font-medium">
                Active Users
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                {(activeTab === "developers"
                  ? developerData
                  : viewerData
                ).filter((user) => user.status === "Active").length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">
              <p className="text-gray-500 font-medium">
                Pending Invites
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                {(activeTab === "developers"
                  ? developerData
                  : viewerData
                ).filter((user) => user.status === "Pending").length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">
              <p className="text-gray-500 font-medium">
                Disabled Accounts
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                {(activeTab === "developers"
                  ? developerData
                  : viewerData
                ).filter((user) => user.status === "Suspended").length}
              </h2>
            </div>

          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden">

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">

              <table className="w-full table-fixed">

                <thead className="bg-gray-50 border-b">

                  <tr className="text-left text-gray-600 text-sm">

                    <th className="px-6 py-4 w-[100px]">
                      Avatar
                    </th>

                    <th className="px-6 py-4 w-[220px]">
                      Name
                    </th>

                    <th className="px-6 py-4 w-[280px]">
                      Email
                    </th>

                    <th className="px-6 py-4 w-[160px]">
                      Status
                    </th>

                    <th className="px-6 py-4 w-[220px]">
                      Last Active
                    </th>

                    <th className="px-6 py-4 w-[160px] text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {(activeTab === "developers"
                    ? developerData
                    : viewerData
                  )
                    .filter(
                      (user) =>
                        `${user?.firstName || ""} ${user?.lastName || ""}`
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||

                        (user?.email || "")
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((user) => (

                      <tr
                        key={user.id}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="px-6 py-4">

                          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                            {user.firstName?.charAt(0)}
                            {user.lastName?.charAt(0)}
                          </div>

                        </td>

                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {user.firstName} {user.lastName}
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {user.email}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusClass(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>

                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          {user.lastActive}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setPopupType("view")
                                setShowPopup(true)

                              }}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                              <FaEye size={14} />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setPopupType("edit")
                                setShowPopup(true)
                              }}
                              className="p-2 border border-gray-300 hover:bg-gray-100 rounded-lg transition"
                            >
                              <FaEdit size={14} />
                            </button>

                            <button
                              onClick={() => {
                                setDeleteUserId(user._id)
                                setShowDeleteModal(true)
                              }}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                            >
                              <FaTrash size={14} />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y">

              {(activeTab === "developers"
                ? developerData
                : viewerData
              )
                .filter(
                  (user) =>
                    `${user?.firstName || ""} ${user?.lastName || ""}`
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||

                    (user?.email || "")
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((user) => (

                  <div
                    key={user.id}
                    className="p-4"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <h3 className="font-semibold text-gray-900 truncate">
                              {user.firstName} {user.lastName}
                            </h3>

                            <p className="text-sm text-gray-500 break-all">
                              {user.email}
                            </p>

                          </div>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusClass(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>

                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                          {user.lastActive}
                        </p>

                        <div className="flex gap-3 mt-4">

                          <button
                            onClick={() => {
                              setSelectedUser(user)
                              setPopupType("view")
                              setShowPopup(true)
                            }}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-xl transition"
                          >
                            View
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user)
                              setPopupType("edit")

                              setEditData({
                                id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                role: user.role,
                                status: user.status || "Active",
                              })

                              setIsChanged(false)
                              setShowPopup(true)
                            }}
                            className="flex-1 py-2 border border-gray-300 hover:bg-gray-100 text-sm rounded-xl transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setDeleteUserId(user._id)
                              setShowDeleteModal(true)
                            }}
                            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                          >
                            Delete
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </div>
          {/* Popup */}
          {showPopup && selectedUser && (

            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

              <div className="bg-white w-[95%] sm:w-[90%] max-w-[500px] rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-7 relative">

                {/* Close */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-lg"
                >
                  ✕
                </button>

                {/* VIEW */}
                {popupType === "view" && (

                  <div>

                    <div className="flex flex-col items-center text-center border-b pb-6">

                      <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 text-3xl font-bold flex items-center justify-center mb-4">
                        {selectedUser.initials}
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedUser.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {selectedUser.email}
                      </p>

                      <span
                        className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${getStatusClass(
                          selectedUser.status
                        )}`}
                      >
                        {selectedUser.status}
                      </span>

                    </div>

                    <div className="space-y-5 py-6">

                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                          Role
                        </span>

                        <span className="font-semibold text-gray-900">
                          {activeTab === "developers"
                            ? "Developer"
                            : "Viewer"}
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                          Last Active
                        </span>

                        <span className="font-semibold text-gray-900">
                          {selectedUser.lastActive}
                        </span>
                      </div>

                      <div className="flex justify-between border-b pb-3">
                        <span className="text-gray-500">
                          Organization
                        </span>

                        <span className="font-semibold text-gray-900">
                          CloudControl
                        </span>
                      </div>

                    </div>

                    <button
                      onClick={() => setShowPopup(false)}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
                    >
                      Close
                    </button>

                  </div>

                )}

                {/* EDIT */}
                {popupType === "edit" && (

                  <div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      Edit User
                    </h2>

                    <div className="space-y-5">

                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <label className="text-sm font-medium text-gray-600 block mb-2">
                            First Name
                          </label>

                          <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) => {
                              setEditData({
                                ...editData,
                                firstName: e.target.value,
                              })
                              setIsChanged(true)
                            }}
                            className="w-full px-4 py-3 rounded-xl border"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-600 block mb-2">
                            Last Name
                          </label>

                          <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) => {
                              setEditData({
                                ...editData,
                                lastName: e.target.value,
                              })
                              setIsChanged(true)
                            }}
                            className="w-full px-4 py-3 rounded-xl border"
                          />
                        </div>

                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">
                          Email Address
                        </label>

                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => {
                            setEditData({
                              ...editData,
                              email: e.target.value,
                            })

                            setIsChanged(true)
                          }}
                          className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 block mb-2">
                          New Password
                        </label>

                        <input
                          type="password"
                          placeholder="Leave blank to keep current password"
                          value={editData.password}
                          onChange={(e) => {
                            setEditData({
                              ...editData,
                              password: e.target.value,
                            })
                            setIsChanged(true)
                          }}
                          className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div
                        ref={editRoleRef}
                        className="relative"
                      >

                        <label className="text-sm font-medium text-gray-600 block mb-2">
                          Status
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setEditRoleDropdown(
                              !editRoleDropdown
                            )
                          }
                          className="w-full h-[52px] px-4 rounded-2xl border border-gray-300 bg-white flex items-center justify-between text-gray-900 hover:border-blue-500 hover:shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        >

                          <span className="font-medium">
                            {editData.status}
                          </span>

                          <span
                            className={`text-gray-400 transition duration-300 ${editRoleDropdown
                              ? "rotate-180"
                              : ""
                              }`}
                          >
                            ▼
                          </span>

                        </button>

                        {editRoleDropdown && (

                          <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50">

                            {[
                              "Active",
                              "Pending",
                              "Suspended",
                            ].map((status) => (

                              <button
                                key={status}
                                type="button"
                                onClick={() => {

                                  setEditData({
                                    ...editData,
                                    status,
                                  })

                                  setIsChanged(true)

                                  setEditRoleDropdown(false)
                                }}
                                className={`group w-full px-5 py-3 text-left flex items-center justify-between transition-colors duration-200
  ${editData.status === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-800 hover:bg-blue-600 hover:text-white"
                                  }`}
                              >
                                <span className="font-medium transition-colors duration-200">
                                  {status}
                                </span>

                                {editData.status === status ? (
                                  <span className="text-white">
                                    ✓
                                  </span>
                                ) : (
                                  <span className="opacity-0 group-hover:opacity-100 text-white transition">
                                    →
                                  </span>
                                )}

                              </button>

                            ))}

                          </div>

                        )}

                      </div>

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                      <button
                        onClick={() => setShowPopup(false)}
                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>

                      {isChanged && (
                        <button
                          onClick={handleEditUser}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
                        >
                          Save Changes
                        </button>)}

                    </div>

                  </div>

                )}

              </div>

            </div>

          )}


          {/* Permission Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">

            {/* Developer Permissions */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-gray-500 font-medium">
                    Permission Preview
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    Developer Permissions
                  </h2>

                </div>

                <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  Read-only
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="space-y-4">

                  <p className="text-green-600">
                    ✔ Manage VMs
                  </p>

                  <p className="text-green-600">
                    ✔ View Alerts
                  </p>

                  <p className="text-green-600">
                    ✔ Cloud Access
                  </p>

                </div>

                <div className="space-y-4">

                  <p className="text-red-500">
                    ✖ Billing
                  </p>

                  <p className="text-red-500">
                    ✖ Team Management
                  </p>

                </div>

              </div>

            </div>

            {/* Viewer Permissions */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:p-6">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-gray-500 font-medium">
                    Permission Preview
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    Viewer Permissions
                  </h2>

                </div>

                <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium">
                  Read-only
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <div className="space-y-4">

                  <p className="text-green-600">
                    ✔ View Dashboard
                  </p>

                  <p className="text-green-600">
                    ✔ View Billing
                  </p>

                  <p className="text-green-600">
                    ✔ View Alerts
                  </p>

                </div>

                <div className="space-y-4">

                  <p className="text-green-600">
                    ✔ View Alerts
                  </p>

                  <p className="text-red-500">
                    ✖ Cloud Changes
                  </p>

                  <p className="text-red-500">
                    ✖ VM Actions
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>


      {/* Add User Modal */}
      {showAddUser && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white w-[95%] sm:w-[92%] max-w-[600px] rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-7 relative">

            <button
              onClick={() => setShowAddUser(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Add New User
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      lastName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="mt-5">

              <label className="text-sm font-medium text-gray-600 block mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div
              ref={roleRef}
              className="mt-5 relative"
            >

              <label className="text-sm font-medium text-gray-600 block mb-2">
                Role
              </label>

              <button
                type="button"
                onClick={() => setRoleDropdown(!roleDropdown)}
                className="w-full h-[52px] px-4 rounded-2xl border border-gray-300 bg-white flex items-center justify-between text-gray-900 hover:border-blue-500 hover:shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              >

                <span className="font-medium">
                  {newUser.role}
                </span>

                <span
                  className={`text-gray-400 transition duration-300 ${roleDropdown ? "rotate-180" : ""
                    }`}
                >
                  ▼
                </span>

              </button>

              {roleDropdown && (

                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">

                  {["Developer", "Viewer"].map((role) => (

                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setNewUser({
                          ...newUser,
                          role,
                        })

                        setRoleDropdown(false)
                      }}
                      className={`group w-full px-5 py-3 text-left flex items-center justify-between transition-colors duration-200
  ${newUser.role === role
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 hover:bg-blue-600 hover:text-white"
                        }`}
                    >

                      <span className="font-medium">
                        {role}
                      </span>

                      {newUser.role === role ? (
                        <span className="text-white">
                          ✓
                        </span>
                      ) : (
                        <span className="opacity-0 group-hover:opacity-100 text-white transition">
                          →
                        </span>
                      )}

                    </button>

                  ))}

                </div>

              )}

            </div>

            <div className="flex items-center gap-3 mt-6">

              <input
                type="checkbox"
                checked={newUser.invite}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    invite: e.target.checked,
                  })
                }
                className="w-4 h-4"
              />

              <span className="text-sm text-gray-700">
                Send invite email
              </span>

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() => setShowAddUser(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateUser}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
              >
                Create User
              </button>

            </div>

          </div>

        </div>

      )}
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

            <h2 className="text-lg font-semibold mb-4">
              Your profile
            </h2>

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>

                  <div className="font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {user?.email || "email@example.com"}
                  </div>

                </div>

              </div>

              <div className="border-t pt-4 space-y-3 text-sm">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Role
                  </span>

                  <span className="font-medium text-gray-900">
                    {user?.role || "Member"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Organization
                  </span>

                  <span className="font-medium text-gray-900">
                    CloudControl
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Member since
                  </span>

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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">

          <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-2xl">

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <FaTrash className="text-red-600 text-2xl" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-center text-gray-900">
              Delete User
            </h2>

            <p className="text-gray-500 text-center mt-2">
              Are you sure you want to delete this user?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setDeleteUserId(null)
                }}
                className="flex-1 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
              >
                No
              </button>

              <button
                onClick={handleDeleteUser}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl"
              >
                Yes, Delete
              </button>

            </div>

          </div>

        </div>
      )}
      {showLogoutModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm">

      <h2 className="text-xl font-semibold text-center">
        Logout
      </h2>

      <p className="text-gray-500 text-center mt-2">
        Are you sure you want to logout?
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="flex-1 py-2 border rounded-xl"
        >
          No
        </button>

        <button
          onClick={handleLogout}
          className="flex-1 py-2 bg-red-600 text-white rounded-xl"
        >
          Yes
        </button>
      </div>

    </div>
  </div>
)}
    </div>

  )

}