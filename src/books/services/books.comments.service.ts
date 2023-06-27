import { Injectable } from "@nestjs/common";
import { BookCommentCreateDto } from "../interfaces/dto/book.comment.create";
import { BookComment, BookCommentDocument } from "../schemas/bookcomment.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BooksCommentsService 
{
    constructor(
        @InjectModel(BookComment.name) private model: Model<BookCommentDocument>
    ) {}
      
    create(data: BookCommentCreateDto): Promise<BookCommentDocument> 
    {
        const comment = new this.model(data);
        return comment.save();
    }

    update(id: string, data: BookCommentCreateDto): Promise<BookCommentDocument>
    {
      return this.model.findOneAndUpdate(
          { _id: id },
          data,
      );
    }
  
    delete(id: string): Promise<BookCommentDocument> 
    {
      return this.model.findOneAndRemove({ _id: id });
    }

    findById(id: string): Promise<BookCommentDocument[]> 
    {
      return this.model.find({bookId: id}).sort({_id: -1}).exec();
    }
}