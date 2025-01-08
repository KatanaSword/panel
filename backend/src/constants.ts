export const DB_NAME: string = "panel";

export const USER_TEMPORARY_TOKEN_EXPIRY: number = 5 * 60 * 1000; // 5 min

export const options: { httpOnly: boolean; secret: boolean } = {
  httpOnly: true,
  secret: true,
};