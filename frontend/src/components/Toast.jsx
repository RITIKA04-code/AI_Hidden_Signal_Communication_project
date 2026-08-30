import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

function Toast({ message, type = "info", onClose }) {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="toast-icon success" size={18} />;
      case "warning":
        return <AlertTriangle className="toast-icon warning" size={18} />;
      case "error":
        return <XCircle className="toast-icon error" size={18} />;
      default:
        return <Info className="toast-icon info" size={18} />;
    }
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
