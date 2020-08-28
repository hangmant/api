import { FastifyAdapter } from '@nestjs/platform-fastify'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { applyMiddleware } from '../src/utils/setup/apply-middleware'
import { loggerServiceInstance } from '../src/modules/logger/logger.providers'

describe('AppController (e2e)', () => {
  let app

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication(new FastifyAdapter(), {
      logger: loggerServiceInstance
    })
    applyMiddleware(app)

    await app.init()
  })

  afterAll(() => {
    return app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404)
  })
})
