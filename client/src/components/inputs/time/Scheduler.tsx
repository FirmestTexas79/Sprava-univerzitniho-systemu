import { Scheduler as SchedulerAld } from "@aldabil/react-scheduler";
import { View } from "@aldabil/react-scheduler/components/nav/Navigation";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";

export interface SchedulerProps {
  view?: View;
  events?: ProcessedEvent[];
  editable?: boolean;
}

export function Scheduler({
                            view = "week",
                            events = [],
                            editable = true,
                          }: Readonly<SchedulerProps>) {
  return (
    <SchedulerAld
      view={view}
      editable={editable}
      agenda={false}
      onConfirm={(events) => console.log(events)}
      events={[...events,
        {
          event_id: 1,
          title: "Event 1",
          start: new Date(),
          end: new Date(new Date().getTime() + 60 * 60 * 1000),
        },
        {
          event_id: 2,
          title: "Event 2",
          start: new Date(),
          end: new Date(new Date().getTime() + 60 * 60 * 1000),
        },
      ]}
    />
  );
}
