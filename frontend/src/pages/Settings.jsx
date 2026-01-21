import { useState, useRef, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import { useNavigate } from "react-router-dom"

export default function Settings() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [changePass, setChangePass] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
const [passwordForm, setPasswordForm] = useState({
  current: "",
  newPass: "",
  confirm: "",
})

const [profileForm, setProfileForm] = useState({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  email: user?.email || "",
})

// const handleProfileSave = async () => {
//   const token = localStorage.getItem("token")

//   const res = await fetch("http://localhost:5000/auth/profile", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(profileForm),
//   })

//   const data = await res.json()

//   if (!res.ok) {
//     alert(data.message || "Update failed")
//     return
//   }

//   localStorage.setItem("user", JSON.stringify(data.user))
//   setEditProfile(false)
//   window.location.reload()
// }

const handlePasswordUpdate = async () => {
  if (passwordForm.newPass !== passwordForm.confirm) {
    return alert("Passwords do not match")
  }

  const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:5000/auth/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: passwordForm.current,
      newPassword: passwordForm.newPass,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return alert(data.message)
  }

  alert("Password updated successfully")
  setChangePass(false)
}

const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  navigate("/login")
}


  const menuRef = useRef()

  useEffect(() => {
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    return () => document.removeEventListener("mousedown", close)
  }, [])

  const inputClass =
    "w-full mt-1 px-3 py-2 border border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

  const team = [
    { id: 1, name: "Aakash Choudhary", email: "aakash@cloudcontrol.com", role: "Admin" },
    { id: 2, name: "Dev Patel", email: "dev@cloudcontrol.com", role: "Developer" },
    { id: 3, name: "Neha Sharma", email: "neha@cloudcontrol.com", role: "Viewer" },
  ]
  const invites = [
    { id: 1, email: "rahul@company.com", role: "Developer" },
    { id: 2, email: "meera@company.com", role: "Viewer" },
  ]

  const roles = {
    Admin: ["Full access", "Billing", "Clouds", "Users"],
    Developer: ["Clouds", "VMs", "Deploy"],
    Viewer: ["Read only"],
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 ml-0 md:ml-64">
        {/* Top Bar */}
        <div className="px-7 pt-7 bg-gray-100 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-200"
              >
                ☰
              </button>

              <h1 className="text-2xl font-semibold">Settings</h1>
            </div>
            <div className="relative" ref={menuRef}>
              <div
                onClick={() => setOpen(!open)}
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
              >
{user?.firstName?.charAt(0).toUpperCase()}
              </div>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg text-sm">
                  <div
                    onClick={() => {
                      setProfileOpen(true)
                      setOpen(false)
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </div>
                  <div
                    onClick={handleLogout}
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
        <div className="p-7">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
            {/* Profile */}
            <div className="bg-white p-6 rounded-2xl shadow min-w-0">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Profile</h2>
                {!editProfile && (
                  <button onClick={() => { setEditProfile(true); setChangePass(false) }} className="text-blue-600 text-sm">
                    Edit
                  </button>
                )}
              </div>

              {!editProfile ? (
                <div className="space-y-3 text-sm text-gray-600">
                  <div><b>Name:</b> {user?.firstName} {user?.lastName}</div>
                  <div><b>Email:</b> {user?.email}</div>
                  <div><b>Role:</b> {user?.role}</div>

                </div>
              ) : (
                <div className="space-y-4">
<input
  className={inputClass}
  value={profileForm.firstName}
  onChange={(e) =>
    setProfileForm({ ...profileForm, firstName: e.target.value })
  }
/>

<input
  className={inputClass}
  value={profileForm.lastName}
  onChange={(e) =>
    setProfileForm({ ...profileForm, lastName: e.target.value })
  }
/>

<input
  className={inputClass}
  value={profileForm.email}
  onChange={(e) =>
    setProfileForm({ ...profileForm, email: e.target.value })
  }
/>


                  <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full">Save</button>
                    <button onClick={() => setEditProfile(false)} className="text-gray-500">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Security */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Security</h2>
                {!changePass && (
                  <button onClick={() => { setChangePass(true); setEditProfile(false) }} className="text-blue-600 text-sm">
                    Change Password
                  </button>
                )}
              </div>

              {!changePass ? (
                <p className="text-sm text-gray-600">Password last changed 14 days ago</p>
              ) : (
                <div className="space-y-4">
<input
  type="password"
  placeholder="Current password"
  className={inputClass}
  onChange={(e) =>
    setPasswordForm({ ...passwordForm, current: e.target.value })
  }
/>

<input
  type="password"
  placeholder="New password"
  className={inputClass}
  onChange={(e) =>
    setPasswordForm({ ...passwordForm, newPass: e.target.value })
  }
/>

<input
  type="password"
  placeholder="Confirm password"
  className={inputClass}
  onChange={(e) =>
    setPasswordForm({ ...passwordForm, confirm: e.target.value })
  }
/>

                  <div className="flex gap-4">
<button
  onClick={handlePasswordUpdate}
  className="bg-blue-600 text-white px-6 py-2 rounded-full"
>
  Update
</button>
                    <button onClick={() => setChangePass(false)} className="text-gray-500">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {/* Team */}
            <div className="bg-white p-6 rounded-2xl shadow col-span-2">
              <div className="flex justify-between mb-4">
                <h2 className="font-semibold">Team</h2>
                <button
                  onClick={() => setInviteOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Invite Member
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[700px] w-full text-sm">
                  <thead className="border-b text-gray-500">
                    <tr>
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">

                    {/* Active Members */}
                    {team.map((u) => (
                      <tr key={u.id}>
                        <td className="py-3">{u.name}</td>
                        <td className="py-3">{u.email}</td>
                        <td className="py-3">{u.role}</td>
                        <td className="py-3 text-green-600">Active</td>
                        <td className="py-3 text-right space-x-4">
                          <button onClick={() => setEditUser(u)} className="text-blue-600">
                            Edit
                          </button>
                          <button className="text-red-600">Remove</button>
                        </td>
                      </tr>
                    ))}

                    {/* Pending Invites */}
                    {invites.map((i) => (
                      <tr key={i.id} className="bg-gray-50">
                        <td className="py-3 italic">Pending</td>
                        <td className="py-3">{i.email}</td>
                        <td className="py-3">{i.role}</td>
                        <td className="py-3 text-yellow-600">Invited</td>
                        <td className="py-3 text-right space-x-4">
                          <button className="text-blue-600">Resend</button>
                          <button className="text-red-600">Cancel</button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
              {inviteOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white w-[420px] p-6 rounded-2xl shadow-xl">

                    <h3 className="text-lg font-semibold mb-4">Invite team member</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Email address</label>
                        <input
                          className="w-full mt-1 px-3 py-2 border border-blue-500 rounded-lg"
                          placeholder="user@company.com"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select className="w-full mt-1 px-3 py-2 border border-blue-500 rounded-lg">
                          <option>Admin</option>
                          <option>Developer</option>
                          <option>Viewer</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-4 pt-4">
                        <button
                          onClick={() => setInviteOpen(false)}
                          className="text-gray-500"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => setInviteOpen(false)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-full"
                        >
                          Send Invite
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
              {editUser && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                  <div className="bg-white w-[420px] p-6 rounded-2xl shadow-xl">

                    <h3 className="text-lg font-semibold mb-4">Edit Member</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                          disabled
                          value={editUser.name}
                          className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                          disabled
                          value={editUser.email}
                          className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select className="w-full mt-1 px-3 py-2 border border-blue-500 rounded-lg">
                          <option>Admin</option>
                          <option>Developer</option>
                          <option>Viewer</option>
                        </select>
                      </div>

                      <div className="flex justify-end gap-4 pt-4">
                        <button
                          onClick={() => setEditUser(null)}
                          className="text-gray-500"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={() => setEditUser(null)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-full"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
            {/* Roles & Permissions */}
            <div className="bg-white p-6 rounded-2xl shadow col-span-2">
              <h2 className="font-semibold mb-4">Roles & Permissions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                {Object.entries(roles).map(([role, perms]) => (
                  <div key={role} className="border rounded-xl p-4">
                    <h3 className="font-semibold mb-2">{role}</h3>
                    {perms.map((p) => (
                      <div key={p} className="text-gray-600">• {p}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
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

                  <h2 className="text-lg font-semibold mb-4">Your profile</h2>

                  <div className="space-y-5">

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user?.name || "User"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user?.email || "email@example.com"}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Role</span>
                        <span className="font-medium text-gray-900">
                          {user?.role || "Member"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Organization</span>
                        <span className="font-medium text-gray-900">
                          CloudControl
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Member since</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}
