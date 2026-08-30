import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  Menu,
  X
} from "lucide-react";
import { checkHealthWithLatency } from "../services/api";

function TopBar({ onToggleSidebar, isSidebarOpen }) {
  const [health, setHealth] = useState({ online: true, latency: 0 });
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState([
    { id: 1, text: "AI Engine trained & operational", time: "Just now", type: "info" },
    { id: 2, text: "Continuous hidden signal scan active", time: "2m ago", type: "success" },
    { id: 3, text: "Backend API fast connection established", time: "5m ago", type: "info" }
  ]);

  useEffect(() => {
    let isMounted = true;
    const fetchHealth = async () => {
      const res = await checkHealthWithLatency();
      if (isMounted) {
        setHealth(res);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-title">
        <button 
          className="mobile-menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="mobile-logo">
          <ShieldCheck size={22} />
        </div>

        <div>
          <h1>AI Hidden-Signal Intelligence</h1>
          <p>Communication Detection & Analysis Platform</p>
        </div>
      </div>

      <div className="topbar-actions">
        {/* Dynamic Health & Latency Pill */}
        <div className={`system-status ${health.online ? "online" : "offline"}`}>
          <span className={`online-dot ${health.online ? "pulse" : "static"}`}></span>
          <span className="status-label">
            {health.online ? "SYSTEM ONLINE" : "DISCONNECTED"}
          </span>
          {health.online && (
            <span className="latency-tag">
              <Zap size={11} /> {health.latency}ms
            </span>
          )}
        </div>

        {/* Quick Search */}
        <div className="search-container">
          <button 
            className={`icon-button ${showSearch ? "active" : ""}`}
            onClick={() => setShowSearch(!showSearch)}
            title="Search Platform"
          >
            <Search size={18} />
          </button>
          {showSearch && (
            <div className="search-popover">
              <input
                type="text"
                placeholder="Search threats, signatures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <span className="search-hint">Press Esc to close</span>
            </div>
          )}
        </div>

        {/* Notifications Button */}
        <div className="notifications-container">
          <button 
            className={`icon-button ${showNotifications ? "active" : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-dot"></span>
          </button>
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <h3>System Notifications</h3>
                <span className="badge">3 New</span>
              </div>
              <div className="dropdown-list">
                {notifications.map((n) => (
                  <div key={n.id} className="notification-item">
                    {n.type === "success" ? (
                      <CheckCircle2 size={15} className="text-emerald" />
                    ) : (
                      <Zap size={15} className="text-sky" />
                    )}
                    <div>
                      <p>{n.text}</p>
                      <small>{n.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="user-badge" title="Security Officer Profile">
          <span>AI</span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;