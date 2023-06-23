import { Book } from '../../schemas/book.schema';

export const BookStub = (): Book => {
    return {
        title: "Тестовое название книги",
        description: "Тестовое описание книги",
        authors: "Иванов И.В."
    }
}