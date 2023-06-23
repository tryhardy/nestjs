import { Book } from "../../schemas/book.schema";
import { BookStub } from "../stubs/book.stub";

export class BookModel
{
    protected entityStub = BookStub();

    constructor(createEntityData : Book) {
        this.constructorSpy(createEntityData);
    }

    constructorSpy(_createEntityData : Book): void {}

    async save(): Promise<Book> {
        return this.entityStub;
    }

    static find(): { exec: () => {}} {
        return {exec: () : any[] => {
            return [BookStub(), BookStub()];
        }};
    }

    static async findOneAndUpdate({_id : id}): Promise<Book> {
        return BookStub();
    }

    static async findOneAndRemove({_id : id}): Promise<Book> {
        return BookStub();
    }
}