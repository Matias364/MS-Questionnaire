import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Questionnaire extends Document {
  @Prop({ Types: Types.ObjectId ,required: true })
  questionnaireID: string;

  @Prop({ required: true })
  title: string; // Título del formulario

  @Prop({ type: [Question], required: true })
  questions: Question[]; // Lista de preguntas
  
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
