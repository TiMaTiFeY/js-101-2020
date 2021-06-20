import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class BookGqlMutationArgsType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  publicationDate: string;

  @Field({ nullable: true })
  author_id: number;
}