import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './interfaces/dto/user.create';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel, InjectConnection} from '@nestjs/mongoose'
import { UserValidateDto } from './interfaces/dto/user.validate';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private model: Model<UserDocument>,
        @InjectConnection() private connection: Connection
    ) 
    {}

    async create(data: UserCreateDto): Promise<UserDocument> 
    {
      const object = new this.model(data);
      return object.save();
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.model.findOne({email: email});
    }
}