import { CreateCartPort } from '@core/domain/ports/usecases/cart/create-cart.port';

export interface UpdateCartPort extends CreateCartPort {
  id: string;
}
