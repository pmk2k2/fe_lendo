import jwtDecode from "jwt-decode";
import { type IDecodedToken } from "./api/auth/auth.types";

export const toNestedArr = <T>(arr: T[], maxContent = 4) =>
  arr.reduce<T[][]>((prev, curr, i) => {
    const prevLastIndex = prev.length - 1;
    if (i % maxContent === 0) prev.push([curr]);
    else (prev[prevLastIndex] as (typeof curr)[]).push(curr);
    return prev;
  }, []);
export const myJwtDecode = jwtDecode<IDecodedToken>;

