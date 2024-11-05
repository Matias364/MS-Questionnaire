import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Subdocumento para estructura de inidialData
@Schema()
class data{
  @Prop()
  indicador: string; // Indicador de la data
  respuesta: string; // Respuesta de la data
}

// Subdocumento para las preguntas dentro de las secciones
@Schema()
class Question {
  @Prop({ required: true })
  text: string; // El texto de la pregunta

  @Prop({ type: [String], required: true })
  alternatives: string[]; // Las alternativas de respuesta (ej. ["Sí", "No"])

  @Prop({type : String})
  observation : string; // La observacion del usuario
}

// Subdocumento para las secciones dentro del cuestionario
@Schema()
class Section {
  @Prop({ required: true })
  title: string; // El título de la sección (ej. "Estado General")

  @Prop({ type: [Question], required: true })
  questions: Question[]; // Array de preguntas dentro de la sección

  @Prop({ type: String })
  observations?: string; // Observaciones de la sección (opcional)
}

// Esquema principal para el cuestionario sin respuestas
@Schema({ timestamps: true })
export class Questionnaire extends Document {

  @Prop({ required: true })
  name: string; // Nombre del cuestionario (ej. "Check List Equipos")

  @Prop({type : [data], required: true})
  data: data[]; // Array de datos iniciales

  @Prop({ type: [Section], required: true })
  sections: Section[]; // Array de secciones dentro del cuestionario

  @Prop({ default: Date.now })
  createdAt?: Date; // Fecha de creación (auto generado por timestamps)

  @Prop()
  updatedAt?: Date; // Fecha de actualización (auto generado por timestamps)
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
