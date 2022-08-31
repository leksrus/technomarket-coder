import { UserTypes } from "@core/common/enums/user-types";


export interface CreateMessagePort {
  email: string;
  userType?: UserTypes;
  message: string;
}