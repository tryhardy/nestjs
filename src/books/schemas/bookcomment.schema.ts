import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment
{
    @Prop({
        required: true
    })
    bookId: string

    @Prop({
        required: true
    })
    name: string

    @Prop({
        required: true
    })
    comment: string
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment)