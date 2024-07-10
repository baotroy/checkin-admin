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

export interface IProvince {
    _id: string;
    name: string
}

export interface ICampaign {
    _id?: string;
    name: string;
    deleted: boolean;
    userId: {
      _id: string;
      name: string;
    };
    address: string;
    quantity: number;
    time: number;
    description?: string;
    provinceId: {
      _id: string;
      name: string;
    };
  }
  
  export interface IUser {
    _id: string;
    name: string;
  }