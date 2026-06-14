import { RotateCcw, Search } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { useFilter } from "../../hooks/useFilter";
import { formatDateTime } from "../../utils/format";

export function DoorLogSearch({ data }) {
  const { keyword, setKeyword, filterValues, setFilter, resetFilters, filtered } = useFilter(data.logs, {
    keywordFields: ["opener_name", "device_name", "failure_reason"],
    filters: { result: "" },
  });

  const hasFilter = keyword || filterValues.result;

  const filters = (
    <div className="filter-bar">
      <label>
        <Search size={16} />
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索人员、设备或原因" />
      </label>
      <select value={filterValues.result} onChange={(event) => setFilter("result", event.target.value)}>
        <option value="">全部结果</option>
        <option value="success">成功</option>
        <option value="denied">拒绝</option>
      </select>
      {hasFilter && (
        <button type="button" className="filter-clear" onClick={resetFilters}>
          <RotateCcw size={14} />
          清空筛选
        </button>
      )}
      <span className="filter-count">显示 {filtered.length} / 共 {data.logs.length} 条</span>
    </div>
  );

  return (
    <ListPage
      title="开门日志查询"
      description="按人员、设备、失败原因和开门结果快速筛选门禁流水。"
      loading={data.loading}
      error={data.error}
      items={filtered}
      filters={filters}
    >
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>人员</th>
              <th>类型</th>
              <th>设备</th>
              <th>方式</th>
              <th>结果</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td>{formatDateTime(log.opened_at)}</td>
                <td>{log.opener_name}</td>
                <td>{log.opener_type_display}</td>
                <td>{log.device_name}</td>
                <td>{log.credential_method_display}</td>
                <td><StatusBadge value={log.result} label={log.result_display} /></td>
                <td>{log.failure_reason || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ListPage>
  );
}
