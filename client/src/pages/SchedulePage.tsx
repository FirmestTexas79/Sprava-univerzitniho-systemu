import { Page } from "../components/Page.tsx";
import { Scheduler } from "../components/inputs/time/Scheduler.tsx";

export function SchedulePage() {

  return (

    <Page>
      <Scheduler editable={false} />
    </Page>
  );
}
