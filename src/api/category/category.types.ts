import type { BaseApiRes } from "../../types/api.types";

type CategoriesContent = {
  id: string;
  name: string;
  description: string;
  isActive: string;
  children?: CategoriesContent[];
  imageUrl: string;
};

export interface GetAllActiveCategoriesRes extends BaseApiRes {
  data: {
    content: CategoriesContent[];
    pageNo: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    last: boolean;
  };
}
