import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from './question.schema';

@Schema()
export class Section {
  @Prop({ required: true })
  sectionName: string; // Nombre de la seccion

  @Prop({Type: Question, required: true })
  questions: Question[]; // Nombre de la seccio

}

export const SectionSchema = SchemaFactory.createForClass(Section)