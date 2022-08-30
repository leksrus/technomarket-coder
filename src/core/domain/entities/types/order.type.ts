import { Nullable } from '@core/common/types/common-types';
import { ItemType } from '@core/domain/entities/types/item.type';
import { OrderStatus } from "@core/common/enums/order-status";

export type OrderType = {
  id?: string;
  number: number;
  status?: OrderStatus;
  email: string;
  items: Array<ItemType>;
  createdAt?: Nullable<Date>;
};
