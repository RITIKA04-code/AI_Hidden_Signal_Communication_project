import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  FileText,
  Copy,
  Check
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Toast from "../components/Toast";
import { getHistory } from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [copied, setCopied] = useState(false);

  const showToast = (msg, type = "info") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "info" }), 3500);
  };

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await getHistory(100);
        setHistory(data.history || []);
      } catch (error) {
        console.error("Unable to load history:", error);
        showToast("Failed to fetch history from AI backend.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.message?.toLowerCase().includes(search.toLowerCase()) ||
      item.classification?.toLowerCase().includes(search.toLowerCase());

    const matchesRisk =
      riskFilter === "ALL" || (item.risk_level || "").toUpperCase() === riskFilter;

    return matchesSearch && matchesRisk;
  });

  const getRiskIcon = (risk) => {
    const r = (risk || "").toUpperCase();
    if (r === "CRITICAL" || r === "HIGH") {
      return <ShieldAlert size={15} />;
    }
    if (r === "MEDIUM") {
      return <AlertTriangle size={15} />;
    }
    return <CheckCircle size={15} />;
  };

  const handleCopyMessage = (msg) => {
    navigator.clipboard.writeText(msg);
    setCopied(true);
    showToast("Message text copied to clipboard!", "success");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        <div className="dashboard-content">
          {/* Header */}
          <div className="history-header">
            <div>
              <span className="eyebrow">INTELLIGENCE RECORDS</span>
              <h2>Detection History</h2>
              <p>Review previously analyzed communications, signal telemetry, and AI assessments.</p>
            </div>

            <div className="history-count">
              <strong>{filteredHistory.length}</strong>
              <span>RECORDS FOUND</span>
            </div>
          </div>

          {/* Controls */}
          <div className="history-controls">
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search communications, classifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-search-btn" onClick={() => setSearch("")}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="risk-filters">
              <span className="filter-icon-label">
                <Filter size={15} /> FILTER BY RISK:
              </span>
              {["ALL", "LOW", "MEDIUM", "HIGH", "CRITICAL"].map((risk) => (
                <button
                  key={risk}
                  className={`filter-btn ${riskFilter === risk ? "filter-active" : ""}`}
                  onClick={() => setRiskFilter(risk)}
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>

          {/* Table Card */}
          <div className="history-table-card">
            {loading ? (
              <div className="history-empty">
                <Clock size={32} className="spin-slow text-sky" />
                <h3>Loading Detection History...</h3>
              </div>
            ) : filteredHistory.length === 0 ? (
              <div className="history-empty">
                <Clock size={36} className="text-muted" />
                <h3>No records found</h3>
                <p>Try modifying your search text or threat risk filter.</p>
              </div>
            ) : (
              <div className="history-table-container">
                <div className="history-table">
                  <div className="history-row history-head">
                    <span>ID</span>
                    <span>CLASSIFICATION & PREVIEW</span>
                    <span>RISK</span>
                    <span>CONFIDENCE</span>
                    <span>PROBABILITY</span>
                    <span>TIMESTAMP</span>
                  </div>

                  {filteredHistory.map((item) => {
                    const date = new Date(item.timestamp);
                    const risk = (item.risk_level || "LOW").toUpperCase();

                    return (
                      <div
                        className="history-row clickable-row"
                        key={item.id}
                        onClick={() => setSelectedRecord(item)}
                      >
                        <span className="record-id">
                          #{String(item.id).padStart(3, "0")}
                        </span>

                        <span className="message-cell">
                          <strong>{item.classification}</strong>
                          <small className="message-preview-text">{item.message}</small>
                        </span>

                        <span>
                          <span className={`risk-pill ${risk.toLowerCase()}`}>
                            {getRiskIcon(risk)}
                            {risk}
                          </span>
                        </span>

                        <span className="confidence">
                          {((item.confidence || 0) * 100).toFixed(1)}%
                        </span>

                        <span className="probability">
                          {((item.suspicious_probability || 0) * 100).toFixed(1)}%
                        </span>

                        <span className="timestamp">
                          <span>
                            {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <small>{date.toLocaleDateString()}</small>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Record Inspector Modal */}
      {selectedRecord && (
        <div className="modal-backdrop" onClick={() => setSelectedRecord(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <FileText size={20} className="text-sky" />
                <div>
                  <h3>Intelligence Event #{String(selectedRecord.id).padStart(3, "0")}</h3>
                  <p>{new Date(selectedRecord.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedRecord(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-badge-group">
                <div className={`risk-pill ${selectedRecord.risk_level?.toLowerCase()}`}>
                  {getRiskIcon(selectedRecord.risk_level)}
                  {selectedRecord.risk_level} RISK
                </div>

                <div className="modal-stat">
                  <span>Classification:</span>
                  <strong>{selectedRecord.classification}</strong>
                </div>

                <div className="modal-stat">
                  <span>AI Confidence:</span>
                  <strong>{((selectedRecord.confidence || 0) * 100).toFixed(1)}%</strong>
                </div>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">
                  <span>COMMUNICATION MESSAGE</span>
                  <button
                    type="button"
                    className="modal-copy-btn"
                    onClick={() => handleCopyMessage(selectedRecord.message)}
                  >
                    {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy Text"}</span>
                  </button>
                </div>
                <div className="modal-message-box">
                  {selectedRecord.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
}

export default History;