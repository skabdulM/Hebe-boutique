import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.users.create(
        {
          data: {
            email: dto.email,
            hash,
            firstName: dto.firstName,
            lastName: dto.lastName,
          },
        },
      );
      // delete user.hash;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials Taken',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: LoginDto) {
    const user =
      await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
      });

    //compare user
    if (!user)
      throw new ForbiddenException(
        'Credentials invalid',
      );

    //compare password
    const passwordMatch = await argon.verify(
      user.hash,
      dto.password,
    );

    if (!passwordMatch)
      throw new ForbiddenException(
        'Credentials invalid',
      );

    //delete user
    // delete user.hash;
    // return user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    {
      const payload = {
        sub: userId,
        email,
      };
      const secret =
        this.config.get('JWT_SECRET');

      const token = await this.jwt.signAsync(
        payload,
        {
          expiresIn: '24h',
          secret: secret,
        },
      );
      return {
        access_token: token,
      };
      //   return this.jwt.signAsync(payload, {
      //     expiresIn: '15m',
      //     secret: secret,
      //   });
    }
  }
}
