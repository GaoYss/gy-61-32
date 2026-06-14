import { CalendarClock, Phone, RotateCcw, Search, UserRound } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { useFilter } from "../../hooks/useFilter";
import { formatDateTime } from "../../utils/format";

export function VisitorRecords({ data }) {
  const { keyword, setKeyword, filterValues, setFilter, resetFilters, filtered } = useFilter(data.visitors, {
    keywordFields: ["visitor_name", "host_name", "phone", "reason", "device_name"],
    filters: { pass_status: "" },
  });

  const hasFilter = keyword || filterValues.pass_status;

  const filters = (
    <div className="filter-bar">
      <label>
        <Search size={16} />
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索访客、受访人、电话或事由" />
      </label>
      <select value={filterValues.pass_status} onChange={(event) => setFilter("pass_status", event.target.value)}>
        <option value="">全部状态</option>
        <option value="pending">待审批</option>
        <option value="approved">已批准</option>
        <option value="rejected">已拒绝</option>
        <option value="expired">已过期</option>
      </select>
      {hasFilter && (
        <button type="button" className="filter-clear" onClick={resetFilters}>
          <RotateCcw size={14} />
          清空筛选
        </button>
      )}
      <span className="filter-count">显示 {filtered.length} / 共 {data.visitors.length} 条</span>
    </div>
  );

  return (
    <ListPage
      title="访客通行记录"
      description="跟踪访客预约、审批状态、拜访对象和授权门禁。"
      loading={data.loading}
      error={data.error}
      items={filtered}
      filters={filters}
    >
      <div className="record-grid">
        {filtered.map((visitor) => (
          <article className="record-card" key={visitor.id}>
            <div className="record-card-head">
              <strong><UserRound size={17} />{visitor.visitor_name}</strong>
              <StatusBadge value={visitor.pass_status} label={visitor.pass_status_display} />
            </div>
            <p>{visitor.reason}</p>
            <dl>
              <div><dt>受访人</dt><dd>{visitor.host_name}</dd></div>
              <div><dt>门禁</dt><dd>{visitor.device_name}</dd></div>
              <div><dt><Phone size={14} />电话</dt><dd>{visitor.phone}</dd></div>
              <div><dt><CalendarClock size={14} />到访</dt><dd>{formatDateTime(visitor.visit_time)}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </ListPage>
  );
}
