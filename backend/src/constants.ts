export const DB_NAME: string = "panel";

export const userRole: { USER: string; ADMIN: string } = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export const availableUserRole: string[] = Object.values(userRole);

export const USER_TEMPORARY_TOKEN_EXPIRY: number = 10 * 60 * 1000; // 10 min

export const options: { httpOnly: boolean; secret: boolean } = {
  httpOnly: true,
  secret: true,
};
