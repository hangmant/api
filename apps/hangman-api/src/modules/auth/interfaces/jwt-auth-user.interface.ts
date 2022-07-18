export interface JwtAuthUser {
  _id: string;
  fullName: string;
  email: string;
  isAuthenticated?: boolean;
}
