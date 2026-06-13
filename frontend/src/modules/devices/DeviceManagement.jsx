import { Activity, MapPin } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { formatDateTime } from "../../utils/format";

export function DeviceManagement({ data }) {
  return (
    <ListPage
      title="门禁设备管理"
      description="查看各出入口设备状态、安装位置和最近心跳时间。"
      loading={data.loading}
      error={data.error}
      items={data.devices}
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
            {data.devices.map((device) => (
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
