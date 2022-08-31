import { ItemPort } from '@core/domain/ports/usecases/item/item.port';
import { Nullable } from '@core/common/types/common-types';

export interface CreateCartPort {
  email: string;
  orderAddress: string;
  items?: Nullable<Array<ItemPort>>;
}
