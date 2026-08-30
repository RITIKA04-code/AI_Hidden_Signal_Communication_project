import { useEffect, useState } from "react";
import {
  Clock,
  ShieldAlert,
  ShieldCheck,
  Activity,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import { getHistory } from "../services/api";

function DetectionHistory() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {

    try {

      setLoading(true);
      setError("");

      const data = await getHistory(50);

      console.log("HISTORY RESPONSE:", data);

      setHistory(data.history || []);

    } catch (err) {

      console.error("History loading failed:", err);

      if (err?.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else {
        setError("Unable to load detection history.");
      }

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadHistory();
  }, []);


  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <TopBar />

        <div className="dashboard-content">

          {/* HEADER */}

          <div className="welcome-section">

            <div>

              <span className="eyebrow">
                INTELLIGENCE OPERATIONS
              </span>

              <h2>
                Detection History
              </h2>

              <p>
                Historical communication detection
                and threat analysis records.
              </p>

            </div>

            <button
              className="refresh-button"
              onClick={loadHistory}
            >
              <RefreshCw size={16} />
              Refresh
            </button>

          </div>


          {/* SUMMARY */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">
                <Activity size={20} />
              </div>

              <div>
                <span>TOTAL ANALYSED</span>

                <strong>
                  {history.length}
                </strong>
              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <ShieldAlert size={20} />
              </div>

              <div>
                <span>SUSPICIOUS</span>

                <strong>
                  {
                    history.filter(
                      item => item.detected
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <ShieldCheck size={20} />
              </div>

              <div>
                <span>NORMAL</span>

                <strong>
                  {
                    history.filter(
                      item => !item.detected
                    ).length
                  }
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Clock size={20} />
              </div>

              <div>
                <span>RECORDS</span>

                <strong>
                  {history.length}
                </strong>
              </div>

            </div>

          </div>


          {/* HISTORY TABLE */}

          <div className="activity-card history-card">

            <div className="chart-heading">

              <div>

                <h3>
                  Communication Records
                </h3>

                <p>
                  AI analysis history
                </p>

              </div>

              <span className="history-count">
                {history.length} records
              </span>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="history-empty">
                <Activity size={22} />
                <p>
                  Loading detection history...
                </p>
              </div>

            )}


            {/* ERROR */}

            {!loading && error && (

              <div className="history-empty error">

                <ShieldAlert size={22} />

                <p>
                  {error}
                </p>

              </div>

            )}


            {/* NO DATA */}

            {!loading &&
              !error &&
              history.length === 0 && (

                <div className="history-empty">

                  <Clock size={25} />

                  <p>
                    No detection history available.
                  </p>

                  <small>
                    Analyze a communication message
                    to create a history record.
                  </small>

                </div>

            )}


            {/* DATA */}

            {!loading &&
              !error &&
              history.length > 0 && (

                <div className="history-table-wrapper">

                  <table className="history-table">

                    <thead>

                      <tr>

                        <th>ID</th>

                        <th>TIME</th>

                        <th>MESSAGE</th>

                        <th>CLASSIFICATION</th>

                        <th>RISK</th>

                        <th>CONFIDENCE</th>

                      </tr>

                    </thead>

                    <tbody>

                      {history.map((item) => {

                        const risk =
                          (
                            item.risk_level ||
                            "LOW"
                          ).toUpperCase();

                        const confidence =
                          Number(
                            item.confidence || 0
                          );

                        const date =
                          new Date(
                            item.timestamp
                          );

                        return (

                          <tr key={item.id}>

                            <td>
                              #{item.id}
                            </td>

                            <td className="history-time">

                              {date.toLocaleString(
                                [],
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                }
                              )}

                            </td>

                            <td className="history-message">

                              {item.message}

                            </td>

                            <td>

                              <span
                                className={
                                  item.detected
                                    ? "classification suspicious"
                                    : "classification normal"
                                }
                              >

                                {item.classification}

                              </span>

                            </td>

                            <td>

                              <span
                                className={
                                  `risk-badge risk-${risk.toLowerCase()}`
                                }
                              >

                                {risk}

                              </span>

                            </td>

                            <td>

                              {(confidence * 100).toFixed(1)}%

                            </td>

                          </tr>

                        );

                      })}

                    </tbody>

                  </table>

                </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default DetectionHistory;