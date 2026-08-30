import {
  LayoutDashboard,
  BarChart3,
  History as ClockHistory,
  Settings,
  Shield,
  Radio,
  Activity,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen = false, onClose }) {
  const navigation = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Detection History",
      path: "/history",
      icon: ClockHistory,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Shield size={23} />
          </div>

          <div>
            <h1>AI DEFENCE</h1>
            <span>INTELLIGENCE PLATFORM</span>
          </div>
        </div>

        <div className="sidebar-status">
          <div className="status-pulse"></div>
          <div>
            <strong>SYSTEM ONLINE</strong>
            <span>AI ENGINE ACTIVE</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-title">
            OPERATIONS
          </span>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-system">
            <div className="system-icon">
              <Radio size={17} />
            </div>

            <div>
              <strong>Detection Engine</strong>
              <span>Operational</span>
            </div>

            <Activity
              size={15}
              className="system-active"
            />
          </div>

          <div className="sidebar-version">
            <span>AI DEFENCE INTELLIGENCE</span>
            <small>v2.0 PRO</small>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;