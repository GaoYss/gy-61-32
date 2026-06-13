import { AlertCircle, Loader2, SearchX } from "lucide-react";

export function EmptyState({ title = "暂无数据", variant = "empty" }) {
  const icons = {
    empty: SearchX,
    loading: Loader2,
    error: AlertCircle,
  };
  const Icon = icons[variant] || icons.empty;
  const className = `empty-state ${variant === "error" ? "error-panel" : ""}`;
  const iconProps = variant === "loading" ? { className: "spin" } : {};
  return (
    <div className={className}>
      <Icon size={20} {...iconProps} />
      <span>{title}</span>
    </div>
  );
}
