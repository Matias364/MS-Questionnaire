import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Questionnaire extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [String], required: true }) // Array de preguntas
  questions: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
