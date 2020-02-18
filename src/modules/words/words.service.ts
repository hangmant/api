import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { ReturnModelType } from '@typegoose/typegoose'
import { from, of } from 'rxjs'
import { concatMap } from 'rxjs/operators'
import { Word } from './words.model'

@Injectable()
export class WordsService {
  constructor(@InjectModel(Word) private readonly wordModel: ReturnModelType<typeof Word>) {}

  findAll() {
    return from(this.wordModel.find({}).exec()).pipe(
      concatMap(items => {
        return of(items)
      })
    )
  }
}
