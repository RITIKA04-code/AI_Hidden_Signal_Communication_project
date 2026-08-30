import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Activity } from "lucide-react";

const chartData = [
  { name: "Low Risk", value: 68, color: "#4ade80", fill: "url(#colorLow)" },
  { name: "Medium", value: 24, color: "#facc15", fill: "url(#colorMed)" },
  { name: "High Risk", value: 7, color: "#fb923c", fill: "url(#colorHigh)" },
  { name: "Critical", value: 2, color: "#f87171", fill: "url(#colorCrit)" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">
          Events: <strong>{payload[0].value}</strong>
        </p>
      </div>
    );
  }
  return null;
};

function ThreatChart() {
  return (
    <div className="chart-card">
      <div className="chart-heading">
        <div>
          <h3>Threat Level Distribution</h3>
          <p>Real-time threat level breakdown</p>
        </div>
        <span className="live-chart-badge">
          <Activity size={12} className="spin-slow" /> LIVE MONITORED
        </span>
      </div>

      <div className="chart-container" style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorMed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#ea580c" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.03)" }} />

            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.color} strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ThreatChart;