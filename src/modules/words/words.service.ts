import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { from, Observable, throwError } from 'rxjs'
import { catchError, concatMap } from 'rxjs/operators'
import { CategoriesService } from '../categories/categories.service'
import { WordCreateInput } from './dtos/word-create.input'
import { WordUpdateInput } from './dtos/word-update.input'
import { Word } from './words.model'

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word) private readonly wordModel: ReturnModelType<typeof Word>,
    private readonly categoriesService: CategoriesService
  ) {}

  findAll(): Observable<Word[]> {
    return from(
      this.wordModel
        .find({})
        .sort({
          createdAt: -1
        })
        .lean()
    )
  }

  getRandomWords(categoryId: string, limit: number = 10): Observable<Word[]> {
    return from(
      this.wordModel
        .aggregate()
        .match({ ...(categoryId ? { category: categoryId } : {}) })
        .sample(limit)
    )
  }

  findById(wordId: string): Observable<Word | null> {
    return from(this.wordModel.findById(wordId).lean())
  }

  create(word: WordCreateInput): Observable<Word> {
    return this.categoriesService.findById(word.categoryId).pipe(
      concatMap((category: any) => {
        if (!category) {
          return throwError(new NotFoundException(`Category doesn't exists`))
        }
        return from(
          this.wordModel.create({
            name: word.name,
            category: word.categoryId
          })
        )
      }),
      catchError(error => {
        return throwError(new ConflictException(error))
      })
    )
  }

  updateById(wordId: string, wordData: WordUpdateInput): Observable<Word | null> {
    return from(
      this.wordModel
        .findByIdAndUpdate(
          wordId,
          {
            $set: wordData
          },
          { new: true }
        )
        .lean()
    )
  }

  deleteById(wordId: string): Observable<Word | null> {
    return from(this.wordModel.findByIdAndDelete(wordId).lean())
  }
}
