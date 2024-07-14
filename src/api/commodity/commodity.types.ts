import { BaseApiRes } from "../../types/api.types";
import { GetAllActiveCategoriesRes } from "../category/category.types";

export type TimeFrame = "DAY" | "MONTH" | "YEAR" | "WEEK";
export type TransactionMethod = "IN_PERSON" | "BANKING";
export type LendingType = "BUSINESS" | "PRIVATE";
export type LendingState = "OLD" | "NEW";
export type Resource = { imageValue: string };

export interface CreateCommodityVars {
  productRequest: {
    name: string;
    description?: string;
    brand?: string;
    categoryIds: string[];
    resources: Resource[];
    standardPrice: number;
    expireDate: string;
  };
  serialNumbers?: string[];
  amount: number;
  state: LendingState;
  availableDate: string;
  timeFrames: TimeFrame[];
  transactionMethods: TransactionMethod[];
  location: string;
  acceptArea: string;
  type: LendingType;
  depositRequired: boolean;
  depositAmount?: number;
}

type Product = Omit<CreateCommodityVars["productRequest"], "categoryIds"> & {
  id: string;
  commodityId: string;
  user: null;
  categories: (Omit<
    GetAllActiveCategoriesRes["data"]["content"],
    "children"
  > & {
    parentId: string | null;
  })[];
  resources: (Resource & { id: string })[];
};

type CreateCommodityData = Omit<
  CreateCommodityVars,
  "productRequest" | "serialNumbers"
> & {
  id: string;
  code: string;
  userId: string;
  serialNumbers: [value: string, status: "ACTIVE"];
  product: Product;
};

export interface CreateCommodityRes extends BaseApiRes {
  data: CreateCommodityData;
}

export interface GetCommodityByIdRes extends BaseApiRes {
  data: {
    id: string;
    code: string;
    state: string;
    availableDate: string | null;
    expireDate: string | null;
    timeFrames: string[];
    transactionMethods: string[];
    location: string;
    acceptArea: string;
    type: string;
    depositRequired: boolean;
    depositAmount: number;
    product: Omit<Product, "resources"> & {
      resources: { imageUrl: string; id: string }[];
    };
    serialNumbers: {
      value: string;
      status: string;
    }[];
    userId: string;
  };
}
