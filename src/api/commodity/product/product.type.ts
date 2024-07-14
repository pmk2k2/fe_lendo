import { BaseApiRes, PageInfoRes } from "../../../types/api.types";

type Product = {
  id: string;
  name: string;
  description: string;
  salePrice: number | null;
  standardPrice: number | null;
  resources: {
    id: string;
    imageUrl: string;
  }[];
  brand: string;
  categories: {
    id: string;
    parentId: string | null;
    name: string;
    description: string;
    isActive: string;
  }[];
  commodityId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatarUrl: string;
    coverUrl: string | null;
    about: string | null;
    country: string | null;
    city: string | null;
    detailAddress: string | null;
    role: string;
    createdDate: string;
    modifiedDate: string;
    status: string;
  };
};

export interface OwnerProduct extends BaseApiRes {
  data: {
    content: Product[];
  } & PageInfoRes;
}
