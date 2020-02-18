
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export abstract class IQuery {
    abstract info(): string | Promise<string>;

    abstract words(): Word[] | Promise<Word[]>;
}

export class Word {
    name?: string;
}

export type JSON = any;
