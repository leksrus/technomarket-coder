import { OrderSchema } from '@infrastructure/adapters/persistence/mogoose/schemas/order.schema';
import { Order } from '@core/domain/entities/order';
import { ItemType } from '@core/domain/entities/types/item.type';
import { Item } from '@core/domain/entities/item';

export class OrderMapper {
  public static toDomainEntity(orderModel: OrderSchema): Order {
    const items: Array<ItemType> = orderModel.items.map((x) => {
      return {
        name: x.name,
        description: x.description,
        category: x.category,
        price: parseFloat(x.price.replace(',', '.')),
        thumbnails: x.thumbnails,
        quantity: x.quantity,
      };
    });

    return Order.new({
      id: orderModel._id.toString(),
      email: orderModel.email,
      number: orderModel.number,
      status: orderModel.status,
      items: items,
      createdAt: new Date(orderModel.createdAt),
    });
  }

  public static fromDomainToNewModel(order: Order): any {
    return Object.assign({
      email: order.email,
      number: order.number,
      status: order.status,
      items: order.items.map((x) => this.fromDomainToNewModelItem(x)),
      createdAt: order.createdAt,
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

  public static toDomainListEntities(ormProducts: Array<OrderSchema>): Array<Order> {
    return ormProducts.map((x) => this.toDomainEntity(x));
  }
}
