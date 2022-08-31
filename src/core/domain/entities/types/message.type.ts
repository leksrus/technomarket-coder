import { UserTypes } from '@core/common/enums/user-types';
import { Nullable } from "@core/common/types/common-types";

export type MessageType = {
  id?: string;
  email: string;
  userType?: UserTypes;
  message: string;
  createdAt?: Nullable<Date>;
};
