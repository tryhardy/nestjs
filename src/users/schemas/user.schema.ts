import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User
{
    @Prop({
        required: true
    })
    public _id: string
    
    @Prop({
        required: true
    })
    public email: string

    @Prop({
        required: true
    })
    public password: string

    @Prop()
    public firstName: string

    @Prop()
    public lastName: string

}

export const UserSchema = SchemaFactory.createForClass(User)