import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { HttpModule } from '@nestjs/axios';
import { AnswersController } from './answers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from 'src/schemas/answers.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule, ConfigModule,
     MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService, MongooseModule]
})
export class AnswersModule {}
