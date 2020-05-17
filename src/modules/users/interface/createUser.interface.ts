import { Country } from '../../../modules/countries/interfaces/country.interface'

export interface CreateUser {
  username?: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  country?: Country
  email: string
  password: string
  avatar?: string
}
