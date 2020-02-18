
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class Category {
    name: string;
    description?: string;
}

export abstract class IQuery {
    abstract categories(): Category[] | Promise<Category[]>;

    abstract words(): Word[] | Promise<Word[]>;
}

export class Word {
    name?: string;
}

export type JSON = any;
