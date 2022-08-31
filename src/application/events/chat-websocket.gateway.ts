import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ForbiddenException, Inject, Logger } from '@nestjs/common';
import { createMessageUseCasePort } from '@core/common/constants/di-constants-tokens';
import { CreateMessageUseCasePort } from '@core/domain/usecases/create-message.usecase.port';
import { CreateMessageAdapter } from '@infrastructure/adapters/usecases/message/create-message.adapter';
import { MessageDto } from '@core/dtos/message.dto';

@WebSocketGateway(3001, { transports: ['websocket'] })
export class ChatWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly _logger: Logger = new Logger(ChatWebsocketGateway.name);

  @WebSocketServer()
  public server: Server;

  private static _participants: Map<string, string> = new Map();

  public constructor(
    @Inject(createMessageUseCasePort)
    private readonly _createMessageUseCasePort: CreateMessageUseCasePort,
  ) {}

  public handleConnection(socket: Socket): void {
    const socketId: string = socket.id;
    this._logger.log(`New connecting... socket id:`, socketId);
    ChatWebsocketGateway._participants.set(socketId, '');
  }

  public handleDisconnect(socket: Socket): void {
    const socketId: string = socket.id;
    this._logger.log(`Disconnection... socket id:`, socketId);
    const clientEmail: string = ChatWebsocketGateway._participants.get(socketId);

    if (clientEmail) {
      this.server.emit(`participants/${clientEmail}`, clientEmail);
    }
  }

  @SubscribeMessage('channel')
  public onChannel(socket: Socket, participantEmail: string): void {
    const socketId: string = socket.id;
    this._logger.log(`Registering new participant... socket id: %s and participant: `, socketId, participantEmail);

    if (!ChatWebsocketGateway._participants.has(participantEmail)) {
      this._logger.error('Room with id: %s was not found, disconnecting the participant', participantEmail);
      socket.disconnect();
      throw new ForbiddenException('The access is forbidden');
    }

    const clientEmail: string = ChatWebsocketGateway._participants.get(socketId);
    ChatWebsocketGateway._participants.set(socketId, clientEmail);
    this.server.emit(`participants/${clientEmail}`, participantEmail);
  }

  @SubscribeMessage('messages')
  public async onMessage(socket: Socket, message: string): Promise<void> {
    const socketId: string = socket.id;
    const clientEmail: string = ChatWebsocketGateway._participants.get(socketId);
    this._logger.log('Received new message... socketId: %s, message: ', socketId, message);

    const adapter: CreateMessageAdapter = await CreateMessageAdapter.new({
      email: clientEmail,
      message: message,
    });

    const messageDto: MessageDto = await this._createMessageUseCasePort.execute(adapter);

    this.server.emit(clientEmail, messageDto);
  }
}
