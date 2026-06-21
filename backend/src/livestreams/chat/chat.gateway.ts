import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() streamId: string, @ConnectedSocket() client: Socket) {
    client.join(streamId);
    console.log(`Client ${client.id} joined stream ${streamId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() streamId: string, @ConnectedSocket() client: Socket) {
    client.leave(streamId);
    console.log(`Client ${client.id} left stream ${streamId}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { streamId: string, userName: string, text: string }, @ConnectedSocket() client: Socket) {
    // Broadcast the message to everyone in the room, including the sender
    this.server.to(data.streamId).emit('newMessage', {
      id: Math.random().toString(36).substring(7),
      userName: data.userName,
      text: data.text,
      timestamp: new Date().toISOString()
    });
  }
}
