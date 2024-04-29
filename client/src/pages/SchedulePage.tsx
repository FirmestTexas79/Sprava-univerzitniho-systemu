import { Page } from "../components/Page.tsx";
import { Scheduler } from "../components/inputs/time/Scheduler.tsx";

export function SchedulePage() {

  return (

      <Page>
          <div className="page-container">
              <Scheduler editable={false}/>
          </div>
      </Page>
);
}
