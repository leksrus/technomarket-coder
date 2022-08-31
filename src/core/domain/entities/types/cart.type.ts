import { Nullable } from '@core/common/types/common-types';

export type CartType = {
  id?: string;
  email: string;
  orderAddress: string;
  editedAt?: Nullable<Date>;
  createdAt?: Nullable<Date>;
};
