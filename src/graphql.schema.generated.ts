
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class WordInput {
    name: string;
    categoryId: string;
}

export class Category {
    name: string;
    description?: string;
}

export abstract class IMutation {
    abstract createWord(data: WordInput): Word | Promise<Word>;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract words(): Word[] | Promise<Word[]>;
}

export class Word {
    name?: string;
}

export type JSON = any;
