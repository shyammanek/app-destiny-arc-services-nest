import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly validUsername = 'admin';
  private readonly validPassword = 'password';

  validateUser(username: string, password: string): string {
    if (username === this.validUsername && password === this.validPassword) {
      // Return a dummy token
      return 'simple-static-token-123';
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  verifyToken(token: string): boolean {
    return token === 'simple-static-token-123';
  }
}
