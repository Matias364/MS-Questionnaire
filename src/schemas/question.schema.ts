import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true })
  questionText: string; // Texto de la pregunta

  @Prop({ required: true })
  questionType: string; // 'text', 'checkbox', 'radio'

}