import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryCreateInput } from './dto/category-create.input';
import { CategoryUpdateInput } from './dto/category-update.input';
import { Category, CategoryDocument } from './models/categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  findAll() {
    return this.categoryModel.find({}).sort({ createdAt: -1 }).lean();
  }

  async findById(categoryId: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId).lean();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findByIds(categoryIds: readonly string[]): Promise<Category[]> {
    return this.categoryModel.find({ _id: { $in: categoryIds } }).lean();
  }

  async create(category: CategoryCreateInput): Promise<Category> {
    return this.categoryModel.create(category);
  }

  async updateById(
    categoryId: string,
    category: CategoryUpdateInput,
  ): Promise<Category> {
    await this.findById(categoryId);

    return this.categoryModel
      .findByIdAndUpdate(
        categoryId,
        {
          $set: category,
        },
        {
          new: true,
        },
      )
      .lean();
  }

  async deleteById(categoryId: string): Promise<Category> {
    return this.categoryModel.findByIdAndDelete(categoryId).lean();
  }
}
