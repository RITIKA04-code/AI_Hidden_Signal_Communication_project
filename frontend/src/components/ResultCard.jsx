import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Activity,
  Brain,
  Search,
  Copy,
  Check,
  Sparkles,
  ShieldAlert,
  Info
} from "lucide-react";

function ResultCard({ result, onCopyToast }) {
  const [copied, setCopied] = useState(false);

  if (!result) {
    return (
      <div className="result-card empty-result">
        <div className="result-empty-icon">
          <Brain size={36} />
        </div>
        <h3>AI Intelligence Engine</h3>
        <p>
          Select a sample preset or type a communication message on the left to execute AI hidden-signal analysis.
        </p>
      </div>
    );
  }

  const analysis = result.analysis || {};
  const explainability = result.explainability || {};

  const probability = Number(analysis.suspicious_probability || 0);
  const percentage = (probability * 100).toFixed(1);
  const risk = (analysis.risk_level || "LOW").toUpperCase();

  const isDanger = risk === "HIGH" || risk === "CRITICAL";
  const isWarning = risk === "MEDIUM";

  // Score SVG gauge setup
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (probability * circumference);

  const getRiskColor = () => {
    if (risk === "CRITICAL") return "#f87171";
    if (risk === "HIGH") return "#fb923c";
    if (risk === "MEDIUM") return "#facc15";
    return "#4ade80";
  };

  const handleCopyReport = () => {
    const reportText = `=== AI HIDDEN-SIGNAL INTELLIGENCE REPORT ===
Classification: ${analysis.classification || "Unknown"}
Risk Level: ${risk}
Suspicious Probability: ${percentage}%
AI Confidence: ${(Number(analysis.confidence || 0) * 100).toFixed(1)}%

[Analyst Recommendation]
${analysis.recommendation || "N/A"}

[Indicators]
${(explainability.indicators || analysis.indicators || []).map(i => `- ${i}`).join("\n") || "No indicators detected."}

[AI Explanation]
${explainability.explanation || "N/A"}
============================================`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    if (onCopyToast) {
      onCopyToast("Report copied to clipboard!");
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`result-card risk-border-${risk.toLowerCase()}`}>
      {/* Header */}
      <div className="result-header">
        <div>
          <span className="eyebrow">AI INTELLIGENCE ASSESSMENT</span>
          <h3>Communication Result</h3>
        </div>

        <div className="result-header-actions">
          <button 
            type="button" 
            className="copy-report-btn" 
            onClick={handleCopyReport}
            title="Copy Report to Clipboard"
          >
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Report"}</span>
          </button>

          <div className={`result-status ${isDanger ? "danger" : isWarning ? "warning" : "safe"}`}>
            {isDanger ? <ShieldAlert size={17} /> : <ShieldCheck size={17} />}
            <span>{risk} RISK</span>
          </div>
        </div>
      </div>

      {/* Main Score Gauge */}
      <div className="threat-score-box">
        <div className="gauge-container">
          <svg className="gauge-svg" viewBox="0 0 100 100">
            <circle
              className="gauge-bg"
              cx="50"
              cy="50"
              r={radius}
            />
            <circle
              className="gauge-fill"
              cx="50"
              cy="50"
              r={radius}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                stroke: getRiskColor(),
              }}
            />
          </svg>
          <div className="gauge-text">
            <strong>{percentage}%</strong>
            <span>THREAT</span>
          </div>
        </div>

        <div className="score-info">
          <div className="classification-badge">
            <Sparkles size={14} />
            <span>{analysis.classification || "Normal Communication"}</span>
          </div>

          <p className="confidence-meter">
            Model Confidence:{" "}
            <strong>{(Number(analysis.confidence || 0) * 100).toFixed(1)}%</strong>
          </p>

          <p className="detected-flag">
            Status: {analysis.detected ? (
              <span className="text-danger">Hidden Signal Detected</span>
            ) : (
              <span className="text-safe">No Hidden Signal Detected</span>
            )}
          </p>
        </div>
      </div>

      {/* Analyst Recommendation */}
      <div className="recommendation-box">
        <Activity size={18} className="rec-icon" />
        <div>
          <strong>Analyst Recommendation</strong>
          <p>{analysis.recommendation || "Maintain standard operational monitoring."}</p>
        </div>
      </div>

      {/* Indicators */}
      <div className="explain-section">
        <div className="explain-heading">
          <Search size={16} />
          <h4>Detection Indicators</h4>
        </div>
        <div className="indicator-list">
          {(explainability.indicators || analysis.indicators || []).length === 0 ? (
            <div className="no-indicator">
              <Info size={14} />
              <span>No anomaly or hidden signal indicators identified.</span>
            </div>
          ) : (
            (explainability.indicators || analysis.indicators || []).map((indicator, index) => (
              <div className="indicator-item" key={index}>
                <span className="indicator-bullet">•</span>
                <span>{indicator}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Engine Contribution Bars */}
      <div className="ai-contribution">
        <div className="explain-heading">
          <Brain size={16} />
          <h4>AI Engine Contribution Breakdown</h4>
        </div>

        <div className="contribution-item">
          <div className="contribution-row">
            <span>Machine Learning Model</span>
            <strong>{(Number(explainability.ml_contribution || 0)).toFixed(1)}%</strong>
          </div>
          <div className="contribution-bar">
            <div
              className="contribution-fill ml-fill"
              style={{
                width: `${Math.min(Number(explainability.ml_contribution || 0), 100)}%`,
              }}
            />
          </div>
        </div>

        <div className="contribution-item">
          <div className="contribution-row">
            <span>Hidden Signal Engine</span>
            <strong>{(Number(explainability.hidden_signal_contribution || 0)).toFixed(1)}%</strong>
          </div>
          <div className="contribution-bar">
            <div
              className="contribution-fill signal-fill"
              style={{
                width: `${Math.min(Number(explainability.hidden_signal_contribution || 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* AI Explanation */}
      <div className="ai-explanation">
        <div className="explain-heading">
          <Brain size={16} />
          <h4>AI Diagnostic Reasoning</h4>
        </div>
        <p>{explainability.explanation || "AI diagnostic report ready."}</p>
      </div>
    </div>
  );
}

export default ResultCard;