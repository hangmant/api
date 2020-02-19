import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of, throwError } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Word } from './words.model'
import { CategoriesService } from '../categories/categories.service'

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word) private readonly wordModel: ReturnModelType<typeof Word>,
    private readonly categoriesService: CategoriesService
  ) {}

  findAll() {
    return from(this.wordModel.find({}).exec()).pipe(
      concatMap(items => {
        return of(items)
      })
    )
  }

  create(word) {
    return this.categoriesService.findById(word.categoryId).pipe(
      concatMap((category: any) => {
        if (!category) {
          throwError(new NotFoundException(`Category doesn't exists`))
        }
        return category
      })
    )
  }
}
