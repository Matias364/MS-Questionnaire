import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true })
  questionText: string; // Texto de la pregunta

  @Prop({ required: true })
  questionType: string; // 'text', 'checkbox', 'radio'

}

@Schema()
export class Questionnaire extends Document {
  @Prop({ required: true })
  title: string; // Título del formulario

  @Prop({ type: [Question], required: true })
  questions: Question[]; // Lista de preguntas
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
