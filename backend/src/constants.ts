export const DB_NAME: string = "panel";

type IUserRole = {
    USER: string,
    ADMIN: string
}

export const userRole: IUserRole = {
    USER: "USER",
    ADMIN: "ADMIN"
}

export const availableUserRole: string[] = Object.values(userRole)

export const USER_TEMPORARY_TOKEN_EXPIRY: number = 10 * 60 * 1000 // 10 min