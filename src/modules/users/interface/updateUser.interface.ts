import { Country } from '../../countries/interfaces/country.interface'

export interface UpdateUser {
  username?: string
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  country?: Country
  email?: string
  avatar?: string
}
