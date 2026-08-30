import { useState } from "react";
import {
  Settings as SettingsIcon,
  Brain,
  ShieldCheck,
  Server,
  SlidersHorizontal,
  Zap,
  Volume2,
  VolumeX,
  Gauge,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Toast from "../components/Toast";
import { checkHealthWithLatency } from "../services/api";

function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [testingPing, setTestingPing] = useState(false);
  const [pingResult, setPingResult] = useState(null);

  // Saved configuration settings
  const [sensitivity, setSensitivity] = useState(() => {
    return Number(localStorage.getItem("ai_sensitivity") || 75);
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("ai_sound") !== "false";
  });

  const [refreshInterval, setRefreshInterval] = useState(() => {
    return Number(localStorage.getItem("ai_refresh") || 15);
  });

  const showToast = (msg, type = "info") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "info" }), 3500);
  };

  const handleSaveSensitivity = (val) => {
    setSensitivity(val);
    localStorage.setItem("ai_sensitivity", val);
    showToast(`AI Detection sensitivity set to ${val}%`, "info");
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("ai_sound", next);
    showToast(next ? "Audio alerts enabled" : "Audio alerts muted", "info");
  };

  const handleRefreshChange = (val) => {
    setRefreshInterval(val);
    localStorage.setItem("ai_refresh", val);
    showToast(`Telemetry refresh interval updated to ${val}s`, "info");
  };

  const handleTestPing = async () => {
    setTestingPing(true);
    const res = await checkHealthWithLatency();
    setPingResult(res);
    setTestingPing(false);
    if (res.online) {
      showToast(`Backend connection healthy (${res.latency}ms)`, "success");
    } else {
      showToast("Backend connection failed", "error");
    }
  };

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isSidebarOpen={sidebarOpen}
        />

        <div className="settings-page">
          {/* Header */}
          <div className="settings-header">
            <div>
              <span className="eyebrow">SYSTEM CONFIGURATION</span>
              <h1>Platform Settings</h1>
              <p>Configure AI detection engine threshold, telemetry intervals, and backend connection diagnostics.</p>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="settings-grid">
            {/* AI Engine Status */}
            <div className="settings-card">
              <div className="settings-card-icon text-sky">
                <Brain size={21} />
              </div>

              <div>
                <h3>AI Detection Engine</h3>
                <p>Machine-learning & hidden-signal classification pipeline.</p>
              </div>

              <div className="setting-status online">
                <span className="pulse"></span>
                <span>ONLINE</span>
              </div>
            </div>

            {/* Security Monitoring */}
            <div className="settings-card">
              <div className="settings-card-icon text-emerald">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3>Threat Monitoring</h3>
                <p>Continuous suspicious communication inspection.</p>
              </div>

              <div className="setting-status online">
                <span className="pulse"></span>
                <span>ACTIVE</span>
              </div>
            </div>

            {/* API Connection */}
            <div className="settings-card">
              <div className="settings-card-icon text-purple">
                <Server size={21} />
              </div>

              <div>
                <h3>Backend FastAPI Service</h3>
                <p>High-performance backend API endpoint (127.0.0.1:8001).</p>
              </div>

              <div className="setting-status online">
                <span className="pulse"></span>
                <span>CONNECTED</span>
              </div>
            </div>

            {/* Fusion Config */}
            <div className="settings-card">
              <div className="settings-card-icon text-amber">
                <SlidersHorizontal size={21} />
              </div>

              <div>
                <h3>Detection Fusion</h3>
                <p>Dual-stage ML and steganography rule engine.</p>
              </div>

              <div className="setting-status online">
                <span className="pulse"></span>
                <span>CONFIGURED</span>
              </div>
            </div>
          </div>

          {/* Interactive Parameters Panel */}
          <div className="settings-panel">
            <div className="settings-info-title">
              <Gauge size={19} className="text-sky" />
              <h3>Interactive Operational Controls</h3>
            </div>

            <div className="controls-group-grid">
              {/* Sensitivity Control */}
              <div className="control-item">
                <div className="control-header">
                  <div>
                    <strong>AI Detection Sensitivity Threshold</strong>
                    <p>Adjust neural confidence threshold before flagging medium/high risk</p>
                  </div>
                  <span className="control-badge">{sensitivity}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={sensitivity}
                  onChange={(e) => handleSaveSensitivity(Number(e.target.value))}
                  className="settings-slider"
                />
              </div>

              {/* Auto Refresh Interval */}
              <div className="control-item">
                <div className="control-header">
                  <div>
                    <strong>Telemetry Auto-Ping Frequency</strong>
                    <p>Configure background status check frequency</p>
                  </div>
                </div>
                <select
                  value={refreshInterval}
                  onChange={(e) => handleRefreshChange(Number(e.target.value))}
                  className="settings-select"
                >
                  <option value={5}>Every 5 Seconds</option>
                  <option value={15}>Every 15 Seconds (Default)</option>
                  <option value={30}>Every 30 Seconds</option>
                  <option value={60}>Every 60 Seconds</option>
                </select>
              </div>

              {/* Sound Alerts */}
              <div className="control-item flex-between">
                <div>
                  <strong>High Risk Audio Notification</strong>
                  <p>Play audio pulse when high/critical threat detected</p>
                </div>
                <button
                  type="button"
                  className={`toggle-btn ${soundEnabled ? "active" : ""}`}
                  onClick={handleToggleSound}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{soundEnabled ? "Enabled" : "Muted"}</span>
                </button>
              </div>

              {/* Connection Diagnostic Ping Tester */}
              <div className="control-item flex-between">
                <div>
                  <strong>Backend Ping Diagnostic</strong>
                  <p>Execute real-time round-trip latency ping to FastAPI server</p>
                </div>
                <button
                  type="button"
                  className="ping-test-btn"
                  onClick={handleTestPing}
                  disabled={testingPing}
                >
                  {testingPing ? (
                    <RefreshCw size={15} className="spin" />
                  ) : (
                    <Zap size={15} />
                  )}
                  <span>{testingPing ? "Pinging..." : "Test Ping"}</span>
                </button>
              </div>
              {pingResult && (
                <div className="ping-result-box">
                  <CheckCircle2 size={16} className="text-emerald" />
                  <span>
                    Server Status: <strong>{pingResult.status || "online"}</strong> | Latency: <strong>{pingResult.latency}ms</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* System Information */}
          <div className="settings-info">
            <div className="settings-info-title">
              <SettingsIcon size={19} className="text-sky" />
              <h3>System Platform Specs</h3>
            </div>

            <div className="system-info-grid">
              <div>
                <span>Platform Name</span>
                <strong>AI Hidden-Signal Intelligence</strong>
              </div>

              <div>
                <span>Detection Architecture</span>
                <strong>ML + Steganography + Fusion Engine</strong>
              </div>

              <div>
                <span>Backend Framework</span>
                <strong>Python FastAPI (Async Engine)</strong>
              </div>

              <div>
                <span>Frontend Technology</span>
                <strong>React 19 + Vite 8 + Recharts</strong>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
}

export default Settings;