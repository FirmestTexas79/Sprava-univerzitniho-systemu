import { User } from "@prisma/client";

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
  value: "MALE",
}, {
  label: "Žena",
  value: "FEMALE",
}, {
  label: "Jiné",
  value: "OTHER",
}];

export const USER_ROLES_OPTIONS = [{
  label: "Student",
  value: "STUDENT",
}, {
  label: "Učitel",
  value: "TEACHER",
}, {
  label: "Administrátor",
  value: "ADMIN",
}];

export function makeUserLabel(user: User) {
  return `${user?.titleBefore || ""} ${user.firstname} ${user.lastname} ${user?.titleAfter || ""}`;
}
