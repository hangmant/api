import { createMicroservice } from '@hangster/setup';
import { MailerModule } from './mailer.module';

createMicroservice(MailerModule);
