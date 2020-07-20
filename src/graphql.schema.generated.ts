
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

export class EmailVerifyInput {
    token: string;
}

export class CountryInput {
    name: string;
    flag?: string;
    alpha2Code: string;
}

export class UserCreateInput {
    username?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: CountryInput;
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
    country?: CountryInput;
    email?: string;
    avatar?: string;
}

export class WordCreateInput {
    name: string;
    categoryId: string;
}

export class WordUpdateInput {
    name?: string;
}

export class Category {
    _id: string;
    name: string;
    color?: string;
    description?: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract category(_id: string): Category | Promise<Category>;

    abstract countries(): Country[] | Promise<Country[]>;

    abstract user(_id: string): User | Promise<User>;

    abstract me(): User | Promise<User>;

    abstract words(): Word[] | Promise<Word[]>;

    abstract word(_id: string): Word | Promise<Word>;

    abstract randomWords(categoryId?: string, limit?: number): Word[] | Promise<Word[]>;
}

export abstract class IMutation {
    abstract createCategory(data: CategoryCreateInput): Category | Promise<Category>;

    abstract updateCategory(_id: string, data: CategoryUpdateInput): Category | Promise<Category>;

    abstract deleteCategory(_id: string): Category | Promise<Category>;

    abstract verifyEmail(data: EmailVerifyInput): EmailVerifyResponse | Promise<EmailVerifyResponse>;

    abstract createUser(data: UserCreateInput): User | Promise<User>;

    abstract updateMe(data: UserUpdateInput): User | Promise<User>;

    abstract createWord(data: WordCreateInput): Word | Promise<Word>;

    abstract updateWord(_id: string, data: WordUpdateInput): Word | Promise<Word>;

    abstract deleteWord(_id: string): Word | Promise<Word>;
}

export class Country {
    name: string;
    flag?: string;
    alpha2Code: string;
}

export class EmailVerifyResponse {
    message: string;
}

export class User {
    _id: string;
    username?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    country?: Country;
    email: string;
    isEmailVerified?: string;
    avatar?: string;
}

export class Word {
    _id: string;
    name: string;
    category: Category;
}

export type JSON = any;
export type GraphQLObjectId = any;
