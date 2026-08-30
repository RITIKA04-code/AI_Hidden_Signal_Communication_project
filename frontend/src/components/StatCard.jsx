function StatCard({
  title,
  value,
  subtitle,
  icon,
  danger = false,
}) {
  return (
    <div className={`stat-card ${danger ? "danger-card" : ""}`}>

      <div className="stat-header">

        <span>{title}</span>

        <div className="stat-icon">
          {icon}
        </div>

      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-subtitle">
        {subtitle}
      </div>

    </div>
  );
}

export default StatCard;