import { RotateCcw, Search, Siren } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { useFilter } from "../../hooks/useFilter";
import { formatDateTime } from "../../utils/format";

export function AlarmCenter({ data }) {
  const { keyword, setKeyword, filterValues, setFilter, resetFilters, filtered } = useFilter(data.alarms, {
    keywordFields: ["title", "description", "device_name"],
    filters: { status: "", level: "" },
  });

  const hasFilter = keyword || filterValues.status || filterValues.level;

  const filters = (
    <div className="filter-bar">
      <label>
        <Search size={16} />
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索标题、描述或设备" />
      </label>
      <select value={filterValues.status} onChange={(event) => setFilter("status", event.target.value)}>
        <option value="">全部状态</option>
        <option value="open">待处理</option>
        <option value="processing">处理中</option>
        <option value="resolved">已处理</option>
      </select>
      <select value={filterValues.level} onChange={(event) => setFilter("level", event.target.value)}>
        <option value="">全部级别</option>
        <option value="low">低</option>
        <option value="medium">中</option>
        <option value="high">高</option>
      </select>
      {hasFilter && (
        <button type="button" className="filter-clear" onClick={resetFilters}>
          <RotateCcw size={14} />
          清空筛选
        </button>
      )}
      <span className="filter-count">显示 {filtered.length} / 共 {data.alarms.length} 条</span>
    </div>
  );

  return (
    <ListPage
      title="异常报警中心"
      description="集中处理尾随、暴力开门、设备离线和黑名单相关报警。"
      loading={data.loading}
      error={data.error}
      items={filtered}
      filters={filters}
    >
      <div className="alarm-list">
        {filtered.map((alarm) => (
          <article className="alarm-item" key={alarm.id}>
            <div className="alarm-icon"><Siren size={20} /></div>
            <div className="alarm-body">
              <div className="alarm-title">
                <strong>{alarm.title}</strong>
                <div>
                  <StatusBadge value={alarm.level} label={alarm.level_display} />
                  <StatusBadge value={alarm.status} label={alarm.status_display} />
                </div>
              </div>
              <p>{alarm.description}</p>
              <span>{alarm.device_name} · {alarm.alarm_type_display} · {formatDateTime(alarm.occurred_at)}</span>
            </div>
          </article>
        ))}
      </div>
    </ListPage>
  );
}
