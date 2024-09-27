import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Section } from './section.schema';

@Schema()
export class Question extends Document{
  @Prop({ required: true })
  Text: string; // Texto de la pregunta

  @Prop({ Type: Section, required: true })
  Section: Section; // 'Seccion de la pregunta

  @Prop({ required: false })//No se si es necesario poner false o eliminar, debido a que es opcion la observacion
  Observation: string;

}

export const QuestionSchema = SchemaFactory.createForClass(Question)