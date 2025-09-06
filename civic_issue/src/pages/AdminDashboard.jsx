import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTachometerAlt, FaTasks, FaUserCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const sidebarLinks = [
  {
    name: "Dashboard",
    key: "dashboard",
    icon: <FaTachometerAlt className="me-2" />,
  },
  { name: "Manage Issues", key: "manage", icon: <FaTasks className="me-2" /> },
];

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
      .then((res) => {
        // Format the data to ensure all required fields are present
        const formattedIssues = res.data.map((issue) => ({
          ...issue,
          reporter: issue.created_by || "Unknown",
          date: new Date(issue.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }));
        setIssues(formattedIssues);
      })
      .catch(() => toast.error("Failed to load admin issues"))
      .finally(() => setLoading(false));
  }, []);

  // Card counts
  const total = issues.length;
  const pending = issues.filter((i) => i.status === "Pending").length;
  const inProgress = issues.filter((i) => i.status === "In Progress").length;
  const resolved = issues.filter((i) => i.status === "Resolved").length;

  const updateStatus = async (idx, newStatus) => {
    const issue = issues[idx];
    try {
      await API.patch(`admin/issues/${issue.id}/status/`, {
        status: newStatus,
      });
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
    <div className="d-flex min-vh-100" style={{ background: "#1a1f2c" }}>
      <ToastContainer />
      {/* Sidebar */}
      <aside
        className="d-flex flex-column p-3"
        style={{ width: "250px", background: "#232b3c" }}
      >
        <div className="h4 text-white text-center border-bottom pb-3 mb-3 d-flex align-items-center justify-content-center">
          <FaUserCog className="me-2" />
          <span>Admin</span>
        </div>
        <nav className="nav flex-column mb-auto">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              className={`btn text-start mb-2 w-100 ${
                active === link.key ? "text-white" : "text-light-emphasis"
              }`}
              style={{
                background: active === link.key ? "#3a4357" : "transparent",
                border: "none",
                transition: "all 0.3s",
              }}
              onClick={() => setActive(link.key)}
            >
              {link.icon} {link.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <header
          className="d-flex justify-content-between align-items-center p-3 border-bottom"
          style={{ background: "#232b3c" }}
        >
          <span className="fw-bold text-light">Welcome, {adminName}</span>
          <button
            className="btn"
            style={{
              background: "#3a4357",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              localStorage.removeItem("jwt");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </header>

        <main className="flex-grow-1 p-4">
          {active === "dashboard" && (
            <div className="row g-4 mb-4">
              <div className="col-md-3">
                <div
                  className="card bg-dark text-center border-0 shadow-sm"
                  style={{
                    background: "#232b3c",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div className="card-body">
                    <h2 className="text-warning">{total}</h2>
                    <p className="mb-0 text-light-emphasis">Total Issues</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-center border-0 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-danger">{pending}</h2>
                    <p className="mb-0 text-light-emphasis">Pending</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-center border-0 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-info">{inProgress}</h2>
                    <p className="mb-0 text-light-emphasis">In Progress</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-dark text-center border-0 shadow-sm">
                  <div className="card-body">
                    <h2 className="text-success">{resolved}</h2>
                    <p className="mb-0 text-light-emphasis">Resolved</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {active === "manage" && (
            <div
              className="card border-0 p-3"
              style={{ background: "#232b3c" }}
            >
              <h4 className="text-light mb-3">Manage Issues</h4>
              {loading ? (
                <div className="text-center py-4 text-light">Loading...</div>
              ) : (
                <div className="table-responsive">
                  <table
                    className="table table-hover align-middle"
                    style={{ color: "#e2e8f0" }}
                  >
                    <thead>
                      <tr style={{ borderBottom: "2px solid #3a4357" }}>
                        <th className="py-3">Title</th>
                        <th className="py-3">Reporter</th>
                        <th className="py-3">Date</th>
                        <th className="py-3">Image</th>
                        <th className="py-3">Status</th>
                        <th className="py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue, idx) => (
                        <tr
                          key={idx}
                          style={{ borderBottom: "1px solid #2d3748" }}
                        >
                          <td className="py-3 fw-semibold">{issue.title}</td>
                          <td
                            className="py-3"
                            style={{ color: "black", fontWeight: "500" }}
                          >
                            {issue.created_by &&
                            typeof issue.created_by === "string" &&
                            issue.created_by.trim() !== ""
                              ? issue.created_by.get_full_name()
                              : "Unknown User"}
                          </td>
                          <td className="py-3" style={{ color: "black" }}>
                            {issue.date ||
                              new Date(issue.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                          </td>
                          <td className="py-3">
                            {issue.image ? (
                              <img
                                src={issue.image}
                                alt="Issue"
                                className="rounded"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                  border: "2px solid #3a4357",
                                }}
                                onError={(e) => {
                                  e.target.src = issue.image.startsWith("http")
                                    ? `/backend/${issue.image}`
                                    : issue.image;
                                }}
                              />
                            ) : (
                              <span className="text-muted fst-italic">
                                No image
                              </span>
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                issue.status === "Pending"
                                  ? "bg-warning text-dark"
                                  : issue.status === "In Progress"
                                  ? "bg-info text-dark"
                                  : "bg-success"
                              }`}
                            >
                              {issue.status}
                            </span>
                          </td>
                          <td>
                            <select
                              value={issue.status}
                              onChange={(e) =>
                                updateStatus(idx, e.target.value)
                              }
                              className="form-select form-select-sm bg-dark text-light border-secondary"
                            >
                              {statusOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
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
