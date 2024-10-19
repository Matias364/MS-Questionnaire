import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionnaireModule } from './http/questionnaire/questionnaire.module';
import { AnswersModule } from './http/answers/answers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModule } from './http/question/question.module';
import { SectionModule } from './http/section/section/section.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
    }),
    QuestionnaireModule,
    AnswersModule,
    QuestionModule,
    SectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
