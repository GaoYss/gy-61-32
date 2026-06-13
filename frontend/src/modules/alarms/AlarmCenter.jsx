import { Siren } from "lucide-react";

import { ListPage } from "../../components/ListPage";
import { StatusBadge } from "../../components/StatusBadge";
import { formatDateTime } from "../../utils/format";

export function AlarmCenter({ data }) {
  return (
    <ListPage
      title="异常报警中心"
      description="集中处理尾随、暴力开门、设备离线和黑名单相关报警。"
      loading={data.loading}
      error={data.error}
      items={data.alarms}
    >
      <div className="alarm-list">
        {data.alarms.map((alarm) => (
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
