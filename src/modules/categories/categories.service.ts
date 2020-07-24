import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of, Observable } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Category } from './models/categories.model'
import { CategoryCreateInput } from './dto/category-create.input'
import { CategoryUpdateInput } from './dto/category-update.input'

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private readonly categoryModel: ReturnModelType<typeof Category>) {}

  findAll() {
    return from(this.categoryModel.find({}).sort({ createdAt: -1 }).lean())
  }

  findById(categoryId: string): Observable<Category | null> {
    return from(this.categoryModel.findById(categoryId).lean())
  }

  findByIds(categoryIds: readonly string[]): Observable<Category[]> {
    return from(this.categoryModel.find({ _id: { $in: categoryIds } }).lean())
  }

  create(category: CategoryCreateInput): Observable<Category> {
    return from(this.categoryModel.create(category))
  }

  updateById(categoryId: string, category: CategoryUpdateInput): Observable<Category | null> {
    return from(
      this.categoryModel
        .findByIdAndUpdate(
          categoryId,
          {
            $set: category
          },
          {
            new: true
          }
        )
        .lean()
    )
  }

  deleteById(categoryId: string): Observable<Category | null> {
    return from(this.categoryModel.findByIdAndDelete(categoryId).lean())
  }
}
