import { Activity, MapPin, Search } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { useFilter } from "../../hooks/useFilter";
import { formatDateTime } from "../../utils/format";

export function DeviceManagement({ data }) {
  const { keyword, setKeyword, filterValues, setFilter, filtered } = useFilter(data.devices, {
    keywordFields: ["device_code", "name", "location"],
    filters: { status: "" },
  });

  const filters = (
    <div className="filter-bar">
      <label>
        <Search size={16} />
        <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索设备编号、名称或位置" />
      </label>
      <select value={filterValues.status} onChange={(event) => setFilter("status", event.target.value)}>
        <option value="">全部状态</option>
        <option value="online">在线</option>
        <option value="offline">离线</option>
        <option value="maintenance">维护中</option>
      </select>
    </div>
  );

  return (
    <ListPage
      title="门禁设备管理"
      description="查看各出入口设备状态、安装位置和最近心跳时间。"
      loading={data.loading}
      error={data.error}
      items={filtered}
      filters={filters}
    >
      <div className="table-panel">
        <table>
          <thead>
            <tr>
              <th>设备编号</th>
              <th>设备名称</th>
              <th>位置</th>
              <th>状态</th>
              <th>最近心跳</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((device) => (
              <tr key={device.id}>
                <td>{device.device_code}</td>
                <td><Activity size={15} />{device.name}</td>
                <td><MapPin size={15} />{device.location}</td>
                <td><StatusBadge value={device.status} label={device.status_display} /></td>
                <td>{formatDateTime(device.last_heartbeat)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ListPage>
  );
}
