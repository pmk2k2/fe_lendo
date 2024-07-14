import { BaseApiRes } from "../../types/api.types";

export interface GetAccountRes extends BaseApiRes {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatarUrl: string;
    coverUrl: null | string;
    about: null | string;
    country: null | string;
    city: null | string;
    detailAddress: null | string;
    role: string;
    createdDate: string;
    modifiedDate: string;
    status: string;
  };
}
