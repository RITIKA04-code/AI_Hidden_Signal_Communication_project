import { useState, useMemo } from "react";
import {
  ScanSearch,
  Send,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  FileText,
  Binary,
  Code2,
  CheckCircle2,
  Loader2
} from "lucide-react";

function AnalysisPanel({
  message,
  setMessage,
  onAnalyze,
  loading,
}) {
  const presets = [
    {
      id: "stego",
      label: "🔒 Stego Cipher",
      icon: Code2,
      text: "MEETING AT DAWN. THE EAGLE FLIES AT MIDNIGHT. Secret payload encoded: 0x41 0x42 0x43 0x44.",
    },
    {
      id: "zerowidth",
      label: "👁️ Hidden Characters",
      icon: Binary,
      text: "The project update\u200bis ready for deployment\u200c. All automated unit tests passed successfully\u200d.",
    },
    {
      id: "entropy",
      label: "⚡ High Entropy Payload",
      icon: Sparkles,
      text: "U2FsdGVkX1+9gK8xNz03MjE0NDkwOQ== [HEX: 0x89504E470D0A1A0A0000000D49484452]",
    },
    {
      id: "benign",
      label: "📄 Business Memo",
      icon: FileText,
      text: "Hi team, please review the Q3 quarterly financial report attached before our 2 PM operational status sync.",
    },
  ];

  // Calculate telemetry
  const telemetry = useMemo(() => {
    if (!message) return { entropy: 0, zeroWidthCount: 0, lines: 0 };
    
    // Zero width characters regex
    const zeroWidthRegex = /[\u200B-\u200D\uFEFF]/g;
    const matches = message.match(zeroWidthRegex);
    const zeroWidthCount = matches ? matches.length : 0;

    // Approximate Shannon Entropy
    const len = message.length;
    const freq = {};
    for (let i = 0; i < len; i++) {
      const char = message[i];
      freq[char] = (freq[char] || 0) + 1;
    }
    let entropy = 0;
    for (const char in freq) {
      const p = freq[char] / len;
      entropy -= p * Math.log2(p);
    }

    const lines = message.split("\n").length;

    return {
      entropy: entropy.toFixed(2),
      zeroWidthCount,
      lines,
    };
  }, [message]);

  return (
    <div className="analysis-panel">
      <div className="panel-heading">
        <div className="heading-icon">
          <ScanSearch size={22} />
        </div>
        <div>
          <h2>Communication Analysis</h2>
          <p>
            Submit communication text for AI hidden-signal analysis & entropy inspection
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="presets-container">
        <span className="presets-label">QUICK TEST SAMPLES:</span>
        <div className="presets-chips">
          {presets.map((preset) => {
            const Icon = preset.icon;
            return (
              <button
                key={preset.id}
                type="button"
                className="preset-chip"
                onClick={() => setMessage(preset.text)}
                title="Click to load this sample message"
              >
                <Icon size={13} />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="textarea-wrapper">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste or select a sample communication text here for AI signal analysis..."
          rows={6}
        />
        {telemetry.zeroWidthCount > 0 && (
          <div className="zero-width-alert">
            <AlertTriangle size={14} />
            <span>Warning: {telemetry.zeroWidthCount} hidden zero-width character(s) detected in text!</span>
          </div>
        )}
      </div>

      {/* Live Telemetry Bar */}
      <div className="telemetry-bar">
        <div className="telemetry-item">
          <span>LENGTH:</span>
          <strong>{message.length} chars</strong>
        </div>
        <div className="telemetry-item">
          <span>LINES:</span>
          <strong>{telemetry.lines}</strong>
        </div>
        <div className="telemetry-item">
          <span>ENTROPY:</span>
          <strong>{telemetry.entropy} bits/char</strong>
        </div>
        {telemetry.zeroWidthCount > 0 ? (
          <div className="telemetry-item danger">
            <span>HIDDEN BYTES:</span>
            <strong>{telemetry.zeroWidthCount} DETECTED</strong>
          </div>
        ) : (
          <div className="telemetry-item safe">
            <span>BYTE STATUS:</span>
            <strong>CLEAN</strong>
          </div>
        )}
      </div>

      <div className="analysis-footer">
        <div className="analysis-actions">
          <button
            type="button"
            className="clear-button"
            onClick={() => setMessage("")}
            disabled={!message}
          >
            <RotateCcw size={15} />
            Clear
          </button>

          <button
            type="button"
            className="analyze-button"
            onClick={onAnalyze}
            disabled={loading || !message.trim()}
          >
            {loading ? (
              <>
                <Loader2 size={17} className="spin" />
                <span>ANALYZING...</span>
              </>
            ) : (
              <>
                <Send size={17} />
                <span>ANALYZE MESSAGE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPanel;