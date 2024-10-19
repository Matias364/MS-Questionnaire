import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireController } from './questionnaire.controller';
import { Questionnaire, QuestionnaireSchema } from 'src/schemas/questionnaire.schema';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule, ConfigModule,
    MongooseModule.forFeature([{ name: Questionnaire.name, schema: QuestionnaireSchema }])
    
  ],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService],
  exports: [QuestionnaireService, MongooseModule]
})
export class QuestionnaireModule {}
