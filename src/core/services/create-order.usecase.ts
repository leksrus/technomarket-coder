import { CreateOrderUseCasePort } from '@core/domain/usecases/create-order.usecase.port';
import { OrderDto } from '@core/dtos/order.dto';
import { Inject, Injectable } from '@nestjs/common';
import { mailSenderPort, orderRepositoryPort } from '@core/common/constants/di-constants-tokens';
import { OrderRepositoryPort } from '@core/domain/ports/persistence/order.repository.port';
import { CreateOrderPort } from '@core/domain/ports/usecases/order/create-order.port';
import { Order } from '@core/domain/entities/order';
import { ItemType } from '@core/domain/entities/types/item.type';
import { Nullable } from '@core/common/types/common-types';
import { Exception } from '@core/common/exceptions/exception';
import { StatusCode } from '@core/common/codes/status-code';
import { MailSenderPort } from '@core/domain/ports/mailer/mail-sender.port';

@Injectable()
export class CreateOrderUseCase implements CreateOrderUseCasePort {
  public constructor(
    @Inject(orderRepositoryPort)
    private readonly _orderRepositoryPort: OrderRepositoryPort,
    @Inject(mailSenderPort)
    private readonly _mailSenderPort: MailSenderPort,
  ) {}
  public async execute(payload: CreateOrderPort): Promise<OrderDto> {
    const maxOrder: number = await this._orderRepositoryPort.findMaxOrderNumber();

    const items: Array<ItemType> = payload.items.map((x) => {
      return {
        name: x.name,
        description: x.description,
        category: x.category,
        price: x.price,
        thumbnails: x.thumbnails,
        quantity: x.quantity,
      };
    });

    const order: Order = Order.new({
      status: payload.status,
      number: maxOrder + 1,
      email: payload.email,
      items: items,
    });

    const newOrder: Nullable<Order> = await this._orderRepositoryPort.add(order);

    if (newOrder) {
      const subject: string = `Order ${newOrder.email} Made`;
      const mailBody: string = this.getMailBody(newOrder);
      await this._mailSenderPort.sendEmail(subject, mailBody);

      return OrderDto.toOrderDto(newOrder);
    }

    throw Exception.new(
      {
        code: StatusCode.INTERNAL_SERVER_ERROR,
        data: undefined,
      },
      CreateOrderUseCase.name,
    );
  }

  private getMailBody(order: Order): string {
    return `<b>New order created -> email: ${order.email}, number: ${order.number}, status: ${order.status}, create date: ${
      order.createdAt
    }, items: ${JSON.stringify(order.items)}</b>`;
  }
}
