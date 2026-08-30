import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import {
  getHistory,
  getStatistics,
} from "../services/api";


function Analytics() {

  const [history, setHistory] = useState([]);
  const [statistics, setStatistics] = useState({
    messages_scanned: 0,
    signals_detected: 0,
    high_risk: 0,
    average_confidence: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        setLoading(true);
        setError("");

        const historyData =
          await getHistory(50);

        const statisticsData =
          await getStatistics();

        console.log(
          "History:",
          historyData
        );

        console.log(
          "Statistics:",
          statisticsData
        );

        setHistory(
          historyData.history || []
        );

        setStatistics(
          statisticsData.statistics || {}
        );

      } catch (err) {

        console.error(
          "Analytics loading failed:",
          err
        );

        if (
          err?.response?.status === 401
        ) {

          setError(
            "Your session has expired. Please login again."
          );

        } else {

          setError(
            "Unable to load intelligence history."
          );
        }

      } finally {

        setLoading(false);

      }

    };

    loadAnalytics();

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
                INTELLIGENCE ANALYTICS
              </span>

              <h2>
                Communication History
              </h2>

              <p>
                Historical AI detection and
                threat analysis.
              </p>

            </div>

            <div className="live-indicator">

              <span></span>

              LIVE DATA

            </div>

          </div>


          {/* STATISTICS */}

          <div className="stats-grid">

            <div className="stat-card">

              <div className="stat-icon">
                <MessageSquare size={20} />
              </div>

              <div>

                <span>
                  MESSAGES SCANNED
                </span>

                <strong>
                  {statistics.messages_scanned || 0}
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <Activity size={20} />
              </div>

              <div>

                <span>
                  SIGNALS DETECTED
                </span>

                <strong>
                  {statistics.signals_detected || 0}
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <AlertTriangle size={20} />
              </div>

              <div>

                <span>
                  HIGH RISK
                </span>

                <strong>
                  {statistics.high_risk || 0}
                </strong>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon">
                <ShieldCheck size={20} />
              </div>

              <div>

                <span>
                  AI CONFIDENCE
                </span>

                <strong>
                  {(
                    (statistics.average_confidence || 0)
                    * 100
                  ).toFixed(1)}
                  %
                </strong>

              </div>

            </div>

          </div>


          {/* HISTORY */}

          <div className="activity-card history-card">

            <div className="chart-heading">

              <div>

                <h3>
                  Detection History
                </h3>

                <p>
                  Recent communication analysis
                </p>

              </div>

              <span className="history-count">
                {history.length} records
              </span>

            </div>


            {loading && (

              <div className="no-activity">
                Loading intelligence history...
              </div>

            )}


            {!loading && error && (

              <div className="login-error">
                {error}
              </div>

            )}


            {!loading &&
              !error &&
              history.length === 0 && (

                <div className="no-activity">

                  No communication analysis
                  has been recorded yet.

                </div>

            )}


            {!loading &&
              !error &&
              history.length > 0 && (

                <div className="history-table-wrapper">

                  <table className="history-table">

                    <thead>

                      <tr>

                        <th>
                          TIME
                        </th>

                        <th>
                          COMMUNICATION
                        </th>

                        <th>
                          CLASSIFICATION
                        </th>

                        <th>
                          RISK
                        </th>

                        <th>
                          CONFIDENCE
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {history.map((item) => {

                        const risk =
                          (
                            item.risk_level || "LOW"
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

                            <td className="history-time">

                              {date.toLocaleString(
                                [],
                                {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
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

                              {(
                                confidence * 100
                              ).toFixed(1)}
                              %

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


export default Analytics;