import {
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto, LoginDto } from 'src/auth/dto';
import { ok } from 'assert';
import { EditUserDto } from 'src/user/dto';

describe('app e3e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleaDb();

    pactum.request.setBaseUrl(
      'http://localhost:3000',
    );
  });
  afterAll(() => {
    app.close();
  });
  const dto: AuthDto = {
    email: 'abdul@gmail.com',
    password: 'abdul@gmail.com',
    firstName: 'Abdul Mannan',
    lastName: 'Shaikh',
  };
  describe('Auth', () => {
    describe('Signup', () => {
      it('Should not signup if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: 'abdul@gmail.com',
          })
          .expectStatus(400);
      });
      it('Should not signup if passwotd is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: 'abdul@gmail.com',
          })
          .expectStatus(400);
      });
      it('Should not signup if fields are empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });
      it('Should signup', () => {
        const dto: AuthDto = {
          email: 'abdul@gmail.com',
          password: 'abdul@gmail.com',
          firstName: 'Abdul Mannan',
          lastName: 'Shaikh',
        };
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .stores(
            'userAccessToken',
            'access_token',
          );
      });
    });
    describe('Signin', () => {
      it('Should Signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores(
            'userAccessToken',
            'access_token',
          );
      });
      it('Should not Signin if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: 'abdul@gmail.com',
          })
          .expectStatus(400);
      });
      it('Should not Signin if passwotd is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'abdul@gmail.com',
          })
          .expectStatus(400);
      });
      it('Should not Signin if fields are empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });
      it('Should not Signin if wrong credentials are provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: 'abdawdul@gmail.com',
            password: 'abadul@gmail.com',
          })
          .expectStatus(403);
      });
    });
  });

  describe('User', () => {
    describe('Get current user', () => {
      it('Get the user info', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('Edit the user info', () => {
        const dto: EditUserDto = {
          email: 'iqr123aefa@gmail.com',
          firstName: 'abdul@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users/editUser')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .inspect();
      });
    });
  });
  describe('Cart', () => {
    describe('add to cart ', () => {});
    describe('get cart product by id', () => {});
    describe('Get Cart product ', () => {});
    describe('edit product in cart', () => {});
    describe('delete product', () => {});
  });
  // describe('Products', () => {});
  // describe('Orders', () => {});
});
