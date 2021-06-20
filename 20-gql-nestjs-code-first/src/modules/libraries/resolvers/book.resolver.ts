import {
    Args,
    Parent,
    Query,
    ResolveField,
    Resolver,
    Mutation,
} from '@nestjs/graphql';
import {Book} from '../gql-types/book.gql-type';
import {Author} from '../gql-types/author.gql-type';
import {
    AuthorModelDataModel,
    authors,
    BookModelDataModel,
} from '../../../mocks/data.mocks';
import {books} from '../../../mocks/data.mocks';
import {BookGqlMutationArgsType} from '../gql-types/book.gql-mutation-args.type';

@Resolver(() => Book)
export class BookResolver {

    @Query(() => [Book])
    books(@Args('id', {nullable: true}) bookId: string): BookModelDataModel[] {
        if (bookId) {
            return [books.find((book) => book.id === bookId)];
        }
        return books;
    }

    @Mutation((type) => Book)
    addBook(@Args() args: BookGqlMutationArgsType) {
        const lastBook = books[books.length - 1];
        const newId = lastBook.id + 1;

        const newBook: BookModelDataModel = {
            id: newId,
            ...args,
        };

        books.push(newBook);
        return newBook;
    }

    @Mutation((type) => Book)
    changeBookTitle(@Args('id', {nullable: false}) id: string,
                    @Args('title', {nullable: false}) title: string
    ) {
        const book: BookModelDataModel = books.find((book) => book.id === id);

        if (!book) {
            throw Error(`Invalid id: ${id}`);
        }

        book.title = title;

        return book;
    }

    @ResolveField(() => Author)
    author(@Parent() book: BookModelDataModel): AuthorModelDataModel {
        return authors.find((author) => book.author_id === author.id);
    }

}
