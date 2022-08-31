import { Nullable } from "@core/common/types/common-types";


export type UserType = {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  birthDate: string;
  phone: string;
  avatarUrl: string;
  editedAt?: Nullable<Date>;
  createdAt?: Nullable<Date>;
}