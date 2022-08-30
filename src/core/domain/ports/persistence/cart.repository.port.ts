import { Nullable } from "@core/common/types/common-types";
import { Cart } from "@core/domain/entities/cart";


export interface CartRepositoryPort {
  findById(cartId: string): Promise<Nullable<Cart>>;

  add(cart: Cart): Promise<Nullable<Cart>>;

  update(cart: Cart): Promise<Nullable<Cart>>;

  remove(Cart: Cart): Promise<Nullable<Cart>>;
}