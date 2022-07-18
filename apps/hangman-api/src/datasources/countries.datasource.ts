import { RESTDataSource } from 'apollo-datasource-rest';

export class CountriesAPI extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  async getAll() {
    return this.get(
      '/all?fields=name;capital;currencies;nativeName;flag;timezones;alpha2Code',
    );
  }
}
