import { FieldOfStudy, Room, RoomTypes, Sex, Subject, User, UserRoles } from "@prisma/client";

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const SEX_OPTIONS = [{
  label: "Muž",
  value: Sex.MALE,
}, {
  label: "Žena",
  value: Sex.FEMALE,
}, {
  label: "Jiné",
  value: Sex.OTHER,
}];

export const USER_ROLES_OPTIONS = [{
  label: "Student",
  value: UserRoles.STUDENT,
}, {
  label: "Učitel",
  value: UserRoles.TEACHER,
}, {
  label: "Administrátor",
  value: UserRoles.ADMIN,
}];

export const ROOM_TYPES_OPTIONS = [{
  label: "Seminář",
  value: RoomTypes.SEMINAR,
}, {
  label: "Laboratoř",
  value: RoomTypes.LABORATORY,
}, {
  label: "Počítačová učebna",
  value: RoomTypes.COMPUTERS,
}, {
  label: "Kancelář",
  value: RoomTypes.OFFICE,
}, {
  label: "Jiné",
  value: RoomTypes.OTHER,
}, {
  label: "Přednáškový sál",
  value: RoomTypes.LECTURE,
}];

export const EXAM_TYPES_OPTIONS = [{
  label: "Zkouška",
  value: "EXAM",
}, {
  label: "Prezentace",
  value: "PRESENTATION",
}, {
  label: "Projekt",
  value: "PROJECT",
}];

export const DAYS_OPTIONS = [
  {
    value: 0,
    label: "Pondělí",
  },
  {
    value: 1,
    label: "Úterý",
  },
  {
    value: 2,
    label: "Středa",
  },
  {
    value: 3,
    label: "Čtvrtek",
  },
  {
    value: 4,
    label: "Pátek",
  },
  {
    value: 5,
    label: "Sobota",
  },
  {
    value: 6,
    label: "Neděle",
  },
];

export function makeUserLabel(user?: User) {
  if (!user) return "";

  return `${user?.titleBefore ?? ""} ${user.firstname} ${user.lastname} ${user?.titleAfter ?? ""}`.trim();
}

export function makeRoomLabel(room?: Room) {
  if (!room) return "";

  return `${room.name} - ${room.type} - ${room.capacity}`.trim();
}

export function makeSubjectLabel(subject?: Subject) {
  if (!subject) return "";

  return `${subject.shortName}: ${subject.name}`.trim();
}

export function makeFieldOfStudiesLabel(fieldOfStudy?: FieldOfStudy) {
  if (!fieldOfStudy) return "";

  return `${fieldOfStudy.name} - ${fieldOfStudy.type}`.trim();
}
