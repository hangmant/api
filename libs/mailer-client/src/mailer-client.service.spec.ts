import { Test, TestingModule } from '@nestjs/testing';
import { MailerClientService } from './mailer-client.service';

describe('MailerClientService', () => {
  let service: MailerClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerClientService],
    }).compile();

    service = module.get<MailerClientService>(MailerClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
