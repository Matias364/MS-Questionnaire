import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './http/questionnaire/questionnaire.module';
import { AnswersModule } from './http/answers/answers.module';

@Module({
  imports: [QuestionnaireModule, AnswersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
