import { AutoMapper, Constructable } from 'automapper-nartc'
import { Types } from 'mongoose'
import { InstanceType, ModelType, Typegoose } from 'typegoose'

export abstract class BaseService<T extends Typegoose> {
  protected model: ModelType<T>
  protected mapper: AutoMapper

  private get modelName(): string {
    return this.model.modelName
  }

  private get viewModelName(): string {
    return `${this.model.modelName}Vm`
  }

  async map<T, K>(
    object: Partial<InstanceType<T>>,
    source: Constructable<T>,
    destination: Constructable<K>
  ): Promise<K> {
    return this.mapper.map<T, K>(object as T, source, destination)
  }

  async mapArray<T, K>(
    object: Array<Partial<InstanceType<T>>>,
    source: Constructable<T>,
    destination: Constructable<K>
  ): Promise<K[]> {
    return this.mapper.mapArray<T, K>(object as T[], source, destination)
  }

  async findAll(filter = {}): Promise<InstanceType<T>[]> {
    return this.model.find(filter).exec()
  }

  async findOne(filter = {}): Promise<InstanceType<T>> {
    return this.model.findOne(filter).exec()
  }

  async findById(id: string): Promise<InstanceType<T>> {
    return this.model.findById(this.toObjectId(id)).exec()
  }

  async create(item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model.create(item)
  }

  async delete(id: string): Promise<InstanceType<T>> {
    return this.model.findByIdAndRemove(this.toObjectId(id)).exec()
  }

  async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
    return this.model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec()
  }

  async clearCollection(filter = {}): Promise<{ ok?: number; n?: number }> {
    return this.model.deleteMany(filter).exec()
  }

  private toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id)
  }
}
