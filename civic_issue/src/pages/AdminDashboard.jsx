import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sidebarLinks = [
  { name: "Dashboard", key: "dashboard" },
  { name: "Manage Issues", key: "manage" },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-green-100 text-green-700",
};

const statusOptions = ["Pending", "In Progress", "Resolved"];

function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [issues, setIssues] = useState([]);
  const [adminName] = useState("Admin User");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get("admin/issues/")
      .then((res) => setIssues(res.data))
      .catch(() => toast.error("Failed to load admin issues"))
      .finally(() => setLoading(false));
  }, []);

  // Card counts
  const total = issues.length;
  const pending = issues.filter(i => i.status === "Pending").length;
  const inProgress = issues.filter(i => i.status === "In Progress").length;
  const resolved = issues.filter(i => i.status === "Resolved").length;

  const updateStatus = async (idx, newStatus) => {
    const issue = issues[idx];
    try {
      await API.patch(`admin/issues/${issue.id}/status/`, { status: newStatus });
      // Refresh issues after update
      setLoading(true);
      const res = await API.get("admin/issues/");
      setIssues(res.data);
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ToastContainer />
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl text-blue-600 border-b">Admin Panel</div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          {sidebarLinks.map(link => (
            <button
              key={link.key}
              className={`w-full text-left px-4 py-2 rounded font-medium transition ${active === link.key ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"}`}
              onClick={() => setActive(link.key)}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-8">
          <span className="font-semibold text-lg text-gray-700">Welcome, {adminName}</span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-8">
          {active === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600">{total}</span>
                <span className="mt-2 text-gray-600">Total Issues</span>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-yellow-600">{pending}</span>
                <span className="mt-2 text-gray-600">Pending</span>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600">{inProgress}</span>
                <span className="mt-2 text-gray-600">In Progress</span>
              </div>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <span className="text-2xl font-bold text-green-600">{resolved}</span>
                <span className="mt-2 text-gray-600">Resolved</span>
              </div>
            </div>
          )}
          {active === "manage" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-600">Manage Issues</h2>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="px-4 py-2 text-left font-semibold">Title</th>
                        <th className="px-4 py-2 text-left font-semibold">Reporter</th>
                        <th className="px-4 py-2 text-left font-semibold">Date</th>
                        <th className="px-4 py-2 text-left font-semibold">Image</th>
                        <th className="px-4 py-2 text-left font-semibold">Status</th>
                        <th className="px-4 py-2 text-left font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue, idx) => (
                        <tr key={idx} className="border-b hover:bg-blue-50 transition">
                          <td className="px-4 py-2 font-medium">{issue.title}</td>
                          <td className="px-4 py-2">{issue.reporter}</td>
                          <td className="px-4 py-2 text-gray-500">{issue.date}</td>
                          <td className="px-4 py-2">
                            {issue.image ? (
                              <img
                                src={issue.image.startsWith('http') ? issue.image : `/backend/${issue.image}`}
                                alt="Issue"
                                className="h-16 w-16 object-cover rounded"
                              />
                            ) : (
                              <span className="text-gray-400 italic">No image</span>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[issue.status]}`}>{issue.status}</span>
                          </td>
                          <td className="px-4 py-2">
                            <select
                              value={issue.status}
                              onChange={e => updateStatus(idx, e.target.value)}
                              className="border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              {statusOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
