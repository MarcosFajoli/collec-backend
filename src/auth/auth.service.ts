import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ContaService } from 'src/conta/conta.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private contaService: ContaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    console.log(email);
    const conta = await this.contaService.findByEmail(email);
    const isMatch = await bcrypt.compare(conta.password, pass);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { id: conta.id, email: conta.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
