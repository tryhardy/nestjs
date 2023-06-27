import { 
  ConnectedSocket, 
  MessageBody, 
  SubscribeMessage, 
  WebSocketGateway, 
  WebSocketServer, 
  WsResponse 
} from '@nestjs/websockets';
import { Observable, concatMap, from, map, of, timer } from 'rxjs';
import { Socket, Server } from 'socket.io';
import { BookCommentCreateDto } from './interfaces/dto/book.comment.create';
import { BooksCommentsService } from './services/books.comments.service';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { BookCommentSchema } from './validation/schemas/book.comment.schema';
import { Client } from 'socket.io/dist/client';
import { UseInterceptors } from '@nestjs/common';
import { BooksInterceptor } from './interceptors/books.interseptor';
import { BookComment } from './schemas/bookcomment.schema';

@WebSocketGateway({
  cors: true
})
export class BooksGateway 
{
  constructor(
    private readonly service: BooksCommentsService
  ) {}

  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world! 1';
  }

  @SubscribeMessage('hello')
  handleHelloMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket
  ): string {
    return data;
  }

  @SubscribeMessage('events')
  onEvent() : Observable<WsResponse<number>>
  {
    const event = 'events';
    const response = [1, 2, 3];
    return from(response).pipe(
      map(data => ({ event, data }))
    )
  }

  //@UseInterceptors(new BooksInterceptor)
  @SubscribeMessage('addComment')
  addComment(
    @MessageBody(new JoiValidationPipe(BookCommentSchema)) data: BookCommentCreateDto,
  ) 
  {
    return this.service.create(data);
  }

  @SubscribeMessage('getAllComments')
  getAllComments(
    @MessageBody() id: string,
  ) : Promise<BookComment[]>
  {
    return this.service.findById(id);
  }
}
