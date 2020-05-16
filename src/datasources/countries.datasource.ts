import { RESTDataSource } from 'apollo-datasource-rest'
import { config } from '../config'

export class CountriesAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = config.restCountriesApi
  }

  async getAll() {
    return this.get('/all?fields=name;capital;currencies;nativeName;flag;timezones;alpha2Code')
  }
}
