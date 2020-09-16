import { Injectable, NotFoundException } from '@nestjs/common'
import { ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { CategoriesService } from '../categories/categories.service'
import { WordCreateInput } from './dtos/word-create.input'
import { WordUpdateInput } from './dtos/word-update.input'
import { Word } from './models/words.model'

@Injectable()
export class WordsService {
  constructor(
    @InjectModel(Word) private readonly wordModel: ReturnModelType<typeof Word>,
    private readonly categoriesService: CategoriesService
  ) {}

  async findAll(): Promise<Word[]> {
    return this.wordModel
      .find({})
      .sort({
        createdAt: -1
      })
      .lean()
  }

  async getRandomWords(categoryId: string, limit: number = 10): Promise<Word[]> {
    return this.wordModel
      .aggregate()
      .match({ ...(categoryId ? { category: categoryId } : {}) })
      .sample(limit)
  }

  async findById(wordId: string): Promise<Word> {
    return this.wordModel.findById(wordId).lean()
  }

  async create(word: WordCreateInput): Promise<Word> {
    await this.categoriesService.findById(word.categoryId)

    return this.wordModel.create({
      name: word.name,
      category: word.categoryId
    })
  }

  async updateById(wordId: string, wordData: WordUpdateInput): Promise<Word> {
    const word = await this.wordModel
      .findByIdAndUpdate(
        wordId,
        {
          $set: wordData
        },
        { new: true }
      )
      .lean()
    if (!word) {
      throw new NotFoundException('Word not found')
    }

    return word
  }

  async deleteById(wordId: string): Promise<Word> {
    return this.wordModel.findByIdAndDelete(wordId).lean()
  }
}
