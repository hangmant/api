import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Category } from './categories.model'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>) {}

  findAll() {
    return from(this.categoryModel.find({}).exec()).pipe(
      concatMap(items => {
        return of(items)
      })
    )
  }
}
