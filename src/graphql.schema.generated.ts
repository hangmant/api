
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CategoryCreateInput {
    name: string;
    description?: string;
}

export class CategoryUpdateInput {
    name?: string;
    description?: string;
}

export class WordCreateInput {
    name: string;
    categoryId: GraphQLObjectId;
}

export class Category {
    _id: GraphQLObjectId;
    name: string;
    description?: string;
}

export abstract class IMutation {
    abstract createCategory(data: CategoryCreateInput): Category | Promise<Category>;

    abstract updateCategory(_id: GraphQLObjectId, data: CategoryUpdateInput): Category | Promise<Category>;

    abstract createWord(data: WordCreateInput): Word | Promise<Word>;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract findCategory(id: GraphQLObjectId): Category | Promise<Category>;

    abstract words(): Word[] | Promise<Word[]>;
}

export class Word {
    _id: GraphQLObjectId;
    name: string;
    category: Category;
}

export type JSON = any;
