import {
  ActionEventArgs,
  DragAndDrop,
  EventRenderedArgs,
  Inject,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  Resize,
  ResourceDetails,
  ResourceDirective,
  ResourcesDirective,
  ScheduleComponent,
  TimelineViews,
  ViewDirective,
  ViewsDirective,
} from "@syncfusion/ej2-react-schedule";
import { useEffect, useRef, useState } from "react";
import { extend, isNullOrUndefined } from "@syncfusion/ej2-base";

interface SchedulerProps {
  values: SchedulerData;
}

export function SchedulerOld({values}: SchedulerProps) {
  const [data, setData] = useState(extend([], (values).roomData, null, true));
  const [ownerData, setOwnerData] = useState<Record<string, any>[]>([]);
  const scheduleObj = useRef<ScheduleComponent>(null);

  useEffect(() => {
    setData(extend([], (values).roomData, null, true));
  }, [values]);

  const getRoomName = (value: ResourceDetails) => {
    return (value).resourceData[(value).resource.textField];
  };

  const getRoomType = (value: ResourceDetails) => {
    return (value).resourceData.type;
  };

  const getRoomCapacity = (value: ResourceDetails) => {
    return (value).resourceData.capacity;
  };

  const isReadOnly = (endDate: Date): boolean => {
    return (endDate < new Date(2021, 6, 31, 0, 0));
  };

  const resourceHeaderTemplate = (props: ResourceDetails) => {
    return (
      <div className="template-wrap">
        <div className="room-name">{getRoomName(props)}</div>
        <div className="room-type">{getRoomType(props)}</div>
        <div className="room-capacity">{getRoomCapacity(props)}</div>
      </div>
    );
  };

  const onActionBegin = (args: ActionEventArgs): void => {
    if (args.requestType === "eventCreate" || args.requestType === "eventChange") {
      const data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      args.cancel = !scheduleObj.current?.isSlotAvailable(data);
    }
  };

  const onEventRendered = (args: EventRenderedArgs): void => {
    const data: Record<string, any> = args.data;
    if (isReadOnly(data.EndTime as Date)) {
      args.element.setAttribute("aria-readonly", "true");
      args.element.classList.add("e-read-only");
    }
  };

  const onRenderCell = (args: RenderCellEventArgs): void => {
    if (args.element.classList.contains("e-work-cells")) {
      if (args.date && args.date < new Date(2021, 6, 31, 0, 0)) {
        args.element.setAttribute("aria-readonly", "true");
        args.element.classList.add("e-read-only-cells");
      }
    }
    if (args.elementType === "emptyCells" && args.element.classList.contains("e-resource-left-td")) {
      const target: HTMLElement = args.element.querySelector(".e-resource-text")!;
      target.innerHTML = "<div class=\"name\">Rooms</div><div class=\"type\">Type</div><div class=\"capacity\">Capacity</div>";
    }
  };

  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    const data: Record<string, any> = args.data!;
    if (args.type === "QuickInfo" || args.type === "Editor" || args.type === "RecurrenceAlert" || args.type === "DeleteAlert") {
      const target: HTMLElement = (args.type === "RecurrenceAlert" ||
        args.type === "DeleteAlert") ? args.element[0] : args.target;
      if (!isNullOrUndefined(target) && target.classList.contains("e-work-cells")) {
        if ((target.classList.contains("e-read-only-cells")) ||
          (!scheduleObj.current?.isSlotAvailable(data))) {
          args.cancel = true;
        }
      } else if (!isNullOrUndefined(target) && target.classList.contains("e-appointment") &&
        (isReadOnly(data.EndTime as Date))) {
        args.cancel = true;
      }
    }
  };

  return (<>
    <ScheduleComponent cssClass="timeline-resource" ref={scheduleObj} width="100%" height="650px"
                       selectedDate={new Date(2021, 7, 2)} workHours={{
      start: "08:00",
      end: "18:00",
    }} timeScale={{
      interval: 60,
      slotCount: 1,
    }} resourceHeaderTemplate={resourceHeaderTemplate} eventSettings={{
      dataSource: data,
      fields: {
        id: "Id",
        subject: {
          title: "Summary",
          name: "Subject",
        },
        location: {
          title: "Location",
          name: "Location",
        },
        description: {
          title: "Comments",
          name: "Description",
        },
        startTime: {
          title: "From",
          name: "StartTime",
        },
        endTime: {
          title: "To",
          name: "EndTime",
        },
      },
    }} eventRendered={onEventRendered} popupOpen={onPopupOpen} actionBegin={onActionBegin} renderCell={onRenderCell}
                       group={{
                         enableCompactView: false,
                         resources: ["MeetingRoom"],
                       }}>
      <ResourcesDirective>
        <ResourceDirective field="RoomId" title="Room Type" name="MeetingRoom" allowMultiple={true}
                           dataSource={ownerData} textField="text" idField="id" colorField="color" />
      </ResourcesDirective>
      < ViewsDirective>
        <ViewDirective option="TimelineDay" />
        <ViewDirective option="TimelineWeek" />
      </ViewsDirective>
      < Inject services={[TimelineViews, Resize, DragAndDrop]} />
    </ScheduleComponent>
  </>);
}

export interface SchedulerData {
  scheduleData:           BirthdayDateElement[];
  timelineData:           BirthdayDateElement[];
  zooEventsData:          BirthdayDateElement[];
  eventsData:             EventsDate[];
  employeeEventData:      DoctorsEventDateElement[];
  leaveData:              BirthdayDateElement[];
  recurrenceData:         BirthdayDateElement[];
  webinarData:            WebinarDate[];
  doctorsEventData:       DoctorsEventDateElement[];
  resourceData:           ResourceDate[];
  timelineResourceData:   ResourceDate[];
  resourceTeamData:       ResourceTeamDate[];
  resourceConferenceData: DoctorsEventDateElement[];
  holidayData:            BirthdayDateElement[];
  birthdayData:           BirthdayDateElement[];
  companyData:            BirthdayDateElement[];
  personalData:           BirthdayDateElement[];
  doctorData:             BirthdayDateElement[];
  resAirlinesData:        BirthdayDateElement[];
  fifaEventsData:         FifaEventsDate[];
  roomData:               QuickInfoTemplateDateElement[];
  headerRowData:          BirthdayDateElement[];
  hospitalData:           HospitalDate[];
  waitingList:            HospitalDate[];
  blockData:              BlockDate[];
  resourceSampleData:     DoctorsEventDateElement[];
  quickInfoTemplateData:  QuickInfoTemplateDateElement[];
}

export interface BirthdayDateElement {
  Id:              number;
  Subject:         string;
  StartTime:       Date;
  EndTime:         Date;
  IsAllDay?:       boolean;
  CalendarId?:     number;
  DoctorId?:       number;
  CategoryColor?:  string;
  Location?:       string;
  RecurrenceRule?: string;
  AirlineId?:      number;
}

export interface BlockDate {
  Id:         number;
  Subject:    string;
  StartTime:  Date;
  EndTime:    Date;
  IsAllDay:   boolean;
  IsBlock?:   boolean;
  EmployeeId: number;
}

export interface DoctorsEventDateElement {
  Id:             number;
  Subject:        string;
  EventType?:     DoctorsEventDateEventType;
  StartTime:      Date;
  EndTime:        Date;
  CategoryColor?: string;
  ConferenceId?:  number[];
  OwnerId?:       number;
}

export enum DoctorsEventDateEventType {
  Confirmed = "Confirmed",
  New = "New",
  Requested = "Requested",
}

export interface EventsDate {
  Id:            number;
  Subject:       string;
  StartTime:     Date;
  EndTime:       Date;
  EventType:     EventsDateEventType;
  City:          string;
  CategoryColor: string;
}

export enum EventsDateEventType {
  CommercialEvent = "commercial-event",
  FamilyEvent = "family-event",
  Maintenance = "maintenance",
  PublicEvent = "public-event",
}

export interface FifaEventsDate {
  Id:            number;
  Subject:       string;
  Description:   string;
  StartTime:     Date;
  EndTime:       Date;
  StartTimezone: Timezone;
  EndTimezone:   Timezone;
  City:          string;
  CategoryColor: string;
  GroupId:       number;
}

export enum Timezone {
  AsiaYekaterinburg = "Asia/Yekaterinburg",
  EuropeKaliningrad = "Europe/Kaliningrad",
  EuropeMoscow = "Europe/Moscow",
  EuropeSamara = "Europe/Samara",
  EuropeVolgograd = "Europe/Volgograd",
}

export interface HospitalDate {
  Id:             number;
  Name:           string;
  StartTime:      Date;
  EndTime:        Date;
  Description:    string;
  DepartmentID?:  number;
  ConsultantID?:  number;
  DepartmentName: DepartmentName;
}

export enum DepartmentName {
  Dental = "DENTAL",
  General = "GENERAL",
}

export interface QuickInfoTemplateDateElement {
  RoomId:          number;
  Id:              number;
  Subject:         string;
  Description?:    string;
  StartTime:       Date;
  EndTime:         Date;
  RecurrenceRule?: RecurrenceRule;
  IsBlock?:        boolean;
}

export enum RecurrenceRule {
  FreqDailyInterval1 = "FREQ=DAILY;INTERVAL=1;",
}

export interface ResourceDate {
  Id:        number;
  Subject:   string;
  StartTime: Date;
  EndTime:   Date;
  IsAllDay:  boolean;
  ProjectId: number;
  TaskId:    number;
}

export interface ResourceTeamDate {
  Id:              number;
  Subject:         string;
  StartTime:       Date;
  EndTime:         Date;
  RecurrenceRule?: string;
  ProjectId:       number;
  CategoryId:      number;
}

export interface WebinarDate {
  Id:             number;
  Subject:        string;
  Tags:           string;
  Description:    string;
  StartTime:      Date;
  EndTime:        Date;
  ImageName:      string;
  PrimaryColor:   string;
  SecondaryColor: string;
}

