import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Answer extends Document {
  @Prop({ type: String, required: true })
  questionnaireId: string; // Referencia al cuestionario

  @Prop({ type: String, required: true })
  userId: string; // Referencia al usuario

  @Prop({ type: [String], required: true }) // Respuestas para cada pregunta
  responses: string[];

  @Prop({ type: Date, default: Date.now })
  submittedAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);