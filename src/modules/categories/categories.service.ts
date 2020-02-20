import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of, Observable } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Category } from './categories.model'
import { CreateCategory } from './interfaces/createCategory.interface'
import { UpdateCategory } from './interfaces/updateCategory.interface'

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

  findById(categoryId: string): Observable<Category | null> {
    return from(this.categoryModel.findById(categoryId).lean())
  }

  create(category: CreateCategory): Observable<Category> {
    return from(this.categoryModel.create(category))
  }

  updateById(categoryId: string, categoryDate: UpdateCategory): Observable<Category | null> {
    return from(
      this.categoryModel
        .findByIdAndUpdate(
          categoryId,
          {
            $set: categoryDate
          },
          {
            new: true
          }
        )
        .lean()
    )
  }
}
