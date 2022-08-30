import { Cart } from '@core/domain/entities/cart';
import { CartSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/cart.schema';
import { Item } from '@core/domain/entities/item';

export class CartMapper {
  public static toDomainEntity(cartModel: CartSchema): Cart {
    const cart: Cart = Cart.new({
      id: cartModel._id.toString(),
      email: cartModel.email,
      orderAddress: cartModel.orderAddress,
      createdAt: new Date(cartModel.createdAt),
      editedAt: new Date(cartModel.editedAt),
    });

    cart.items = cartModel.items.map((x) =>
      Item.new({
        name: x.name,
        description: x.description,
        category: x.category,
        price: parseInt(x.price),
        thumbnails: x.thumbnails,
        quantity: x.quantity,
      }),
    );

    return cart;
  }

  public static fromDomainToNewModel(cart: Cart): any {
    return Object.assign({
      email: cart.email,
      orderAddress: cart.orderAddress,
      items: cart.items.map((x) => this.fromDomainToNewModelItem(x)),
      createdAt: cart.createdAt,
      editedAt: cart.editedAt,
    });
  }

  private static fromDomainToNewModelItem(item: Item): any {
    return Object.assign({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      thumbnails: item.thumbnails,
      quantity: item.quantity,
    });
  }
}
