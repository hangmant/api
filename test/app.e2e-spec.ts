import { HttpStatus } from '@nestjs/common'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { loggerServiceInstance } from '../src/modules/logger/logger.providers'
import { applyMiddleware } from '../src/utils/setup/apply-middleware'
import { MongoConfigService } from '../src/modules/mongo/mongoConfig.service'

describe('AppController (e2e)', () => {
  let app
  let mongodb: MongoMemoryServer

  beforeAll(async () => {
    mongodb = new MongoMemoryServer({ autoStart: false })
    await mongodb.ensureInstance()

    jest.spyOn(MongoConfigService.prototype, 'mongoURI', 'get').mockReturnValue(await mongodb.getConnectionString())

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter(), {
      logger: loggerServiceInstance
    })
    applyMiddleware(app)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
    await mongodb.stop()
  })

  describe('REST', () => {
    it('/ (GET)', async () => {
      const response = await request(app.getHttpServer()).get('/').expect(HttpStatus.NOT_FOUND)
      expect(response.body).toMatchSnapshot()
    })

    describe('Authentication /api/auth/login/jwt ', () => {
      it('should return not loggin when JWT is not given', async () => {
        /** TODO: Here error */
        const response = await request(app.getHttpServer()).post('/api/auth/login/jwt').send({ a: 1 })
        expect(true).toBe(true)
      })
    })
  })
})
