import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Eye,
  ShieldCheck,
  Zap
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import AnalysisPanel from "../components/AnalysisPanel";
import ResultCard from "../components/ResultCard";
import ThreatChart from "../components/ThreatChart";
import Toast from "../components/Toast";

import {
  analyzeMessage,
  getStatistics,
  getHistory,
} from "../services/api";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });

  const [statistics, setStatistics] = useState({
    messages_scanned: 0,
    signals_detected: 0,
    high_risk: 0,
    average_confidence: 0,
  });

  const [history, setHistory] = useState([]);

  const showToast = (msg, type = "info") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: "", type: "info" }), 3500);
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const statisticsData = await getStatistics();
        if (statisticsData?.statistics) {
          setStatistics(statisticsData.statistics);
        }

        const historyData = await getHistory(10);
        if (historyData?.history) {
          setHistory(historyData.history);
        }
      } catch (error) {
        console.error("Unable to load dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  const handleAnalyze = async () => {
    if (!message.trim()) return;

    try {
      setLoading(true);
      const data = await analyzeMessage(message);
      setResult(data);

      const risk = (data?.analysis?.risk_level || "LOW").toUpperCase();
      const isHigh = risk === "HIGH" || risk === "CRITICAL";

      showToast(
        `Analysis complete! ${risk} risk level detected.`,
        isHigh ? "error" : risk === "MEDIUM" ? "warning" : "success"
      );

      const updatedStats = await getStatistics();
      if (updatedStats?.statistics) {
        setStatistics(updatedStats.statistics);
      }

      const updatedHistory = await getHistory(10);
      if (updatedHistory?.history) {
        setHistory(updatedHistory.history);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      showToast("Unable to connect to AI backend API.", "error");
    } finally {
      setLoading(false);
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

        <div className="dashboard-content">
          {/* Welcome Header */}
          <div className="welcome-section">
            <div>
              <span className="eyebrow">INTELLIGENCE OPERATIONS</span>
              <h2>Threat Monitoring Dashboard</h2>
              <p>AI-powered communication detection, hidden-signal analysis & entropy inspection.</p>
            </div>

            <div className="live-indicator">
              <span className="live-dot pulse"></span>
              <span>LIVE MONITORING</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <StatCard
              title="MESSAGES SCANNED"
              value={statistics.messages_scanned || 0}
              subtitle="+12.4% this week"
              icon={<Eye size={21} />}
            />

            <StatCard
              title="SIGNALS DETECTED"
              value={statistics.signals_detected || 0}
              subtitle="+8.7% this week"
              icon={<Activity size={21} />}
            />

            <StatCard
              title="HIGH RISK"
              value={statistics.high_risk || 0}
              subtitle="Requires analyst review"
              icon={<AlertTriangle size={21} />}
              danger
            />

            <StatCard
              title="AI CONFIDENCE"
              value={`${((statistics.average_confidence || 0) * 100).toFixed(1)}%`}
              subtitle="Current model accuracy"
              icon={<ShieldCheck size={21} />}
            />
          </div>

          {/* Chart + System Activity Grid */}
          <div className="dashboard-grid">
            <ThreatChart />

            <div className="activity-card">
              <div className="chart-heading">
                <div>
                  <h3>System Activity</h3>
                  <p>Recent intelligence events</p>
                </div>
                <Zap size={16} className="text-sky" />
              </div>

              <div className="activity-list">
                {history.length === 0 ? (
                  <div className="no-activity">
                    No detection activity recorded yet.
                  </div>
                ) : (
                  history.map((item) => {
                    const risk = (item.risk_level || "LOW").toUpperCase();
                    let dotClass = "";
                    if (risk === "CRITICAL" || risk === "HIGH") {
                      dotClass = "danger";
                    } else if (risk === "MEDIUM") {
                      dotClass = "warning";
                    }

                    const messagePreview =
                      item.message && item.message.length > 55
                        ? item.message.substring(0, 55) + "..."
                        : item.message;

                    const eventDate = new Date(item.timestamp);
                    const time = eventDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div className="activity-item" key={item.id}>
                        <span className={`activity-dot ${dotClass}`}></span>
                        <div>
                          <strong>{item.classification}</strong>
                          <small className="activity-preview">{messagePreview}</small>
                          <small className="activity-meta">
                            Risk: <span className={`risk-text ${risk.toLowerCase()}`}>{item.risk_level}</span>
                            {" • "}
                            {time}
                          </small>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* AI Analysis Section */}
          <div className="analysis-section">
            <div className="section-title">
              <span className="eyebrow">AI ANALYSIS ENGINE</span>
              <h2>Analyze Communication</h2>
            </div>

            <div className="analysis-grid">
              <AnalysisPanel
                message={message}
                setMessage={setMessage}
                onAnalyze={handleAnalyze}
                loading={loading}
              />

              <ResultCard
                result={result}
                onCopyToast={(msg) => showToast(msg, "success")}
              />
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

export default Dashboard;