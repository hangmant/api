
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CategoryCreateInput {
    name: string;
    color?: string;
    description?: string;
}

export class CategoryUpdateInput {
    name?: string;
    color?: string;
    description?: string;
}

export class UserCreateInput {
    username?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: string;
    email: string;
    password: string;
    avatar?: string;
}

export class UserUpdateInput {
    username?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    country?: string;
    email?: string;
    avatar?: string;
}

export class WordCreateInput {
    name: string;
    categoryId: GraphQLObjectId;
}

export class WordUpdateInput {
    name?: string;
}

export class Category {
    _id: GraphQLObjectId;
    name: string;
    color?: string;
    description?: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(_id: GraphQLObjectId): Category | Promise<Category>;

    abstract countries(): Country[] | Promise<Country[]>;

    abstract user(_id: GraphQLObjectId): User | Promise<User>;

    abstract me(): User | Promise<User>;

    abstract words(): Word[] | Promise<Word[]>;

    abstract word(_id: GraphQLObjectId): Word | Promise<Word>;

    abstract randomWords(categoryId?: GraphQLObjectId, limit?: number): Word[] | Promise<Word[]>;
}

export abstract class IMutation {
    abstract createCategory(data: CategoryCreateInput): Category | Promise<Category>;

    abstract updateCategory(_id: GraphQLObjectId, data: CategoryUpdateInput): Category | Promise<Category>;

    abstract deleteCategory(_id: GraphQLObjectId): Category | Promise<Category>;

    abstract createUser(data: UserCreateInput): User | Promise<User>;

    abstract updateMe(data: UserUpdateInput): User | Promise<User>;

    abstract createWord(data: WordCreateInput): Word | Promise<Word>;

    abstract updateWord(_id: GraphQLObjectId, data: WordUpdateInput): Word | Promise<Word>;

    abstract deleteWord(_id: GraphQLObjectId): Word | Promise<Word>;
}

export class Country {
    name: string;
    flag: string;
    alpha2Code?: string;
}

export class User {
    _id: GraphQLObjectId;
    username?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: string;
    email: string;
    avatar?: string;
}

export class Word {
    _id: GraphQLObjectId;
    name: string;
    category: Category;
}

export type JSON = any;
