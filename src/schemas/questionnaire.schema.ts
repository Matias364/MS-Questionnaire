import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
//import { Section } from './section.schema';
import { Question } from './question.schema';

@Schema()
export class Questionnaire extends Document {
  @Prop({ Types: Types.ObjectId ,required: true })
  questionnaireID: string;

  @Prop({ required: true })
  title: string; // Título del formulario

  /* Tentativo dependiendo del tipo de formulario en el que estemos basando
  @Prop({ Type: Section, required: true })
  sections: Section[]; // Lista de secciones
  */

  @Prop({ Type: Question, required: true })
  questions: Question[]; // Lista de secciones

  @Prop({required: true})
  nameUser: String;
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
