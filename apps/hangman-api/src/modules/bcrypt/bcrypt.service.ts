import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, Observable } from 'rxjs';

@Injectable()
export class BcryptService {
  encryptPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 8));
  }

  comparePassword(
    password: string,
    hashedPassword: string,
  ): Observable<boolean> {
    return from(bcrypt.compare(password, hashedPassword));
  }
}
