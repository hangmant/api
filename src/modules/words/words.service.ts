import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of, throwError, Observable, concat } from 'rxjs'
import { concatMap, catchError } from 'rxjs/operators'
import { Word } from './words.model'
import { CategoriesService } from '../categories/categories.service'
import { CreateWord } from './interface/createWord.interface'
import { UpdateWord } from './interface/updateWord.interface'

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

  create(word: CreateWord): Observable<Word> {
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

  updateById(wordId: string, wordData: UpdateWord): Observable<Word | null> {
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
