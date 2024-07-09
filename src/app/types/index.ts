export type UserType = {
    _id: string;
    username: string;
    role: 1 | -1;
    deleted: string;
};
export type AuthUserType = {
    _id: string;
    username: string;
    role: number
    accesstoken: string;
}

export enum UserRoleType {
    ADMIN = 1,
    USER = -1

}