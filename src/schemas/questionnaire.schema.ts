import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Subdocumento para estructura de inidialData
@Schema()
class data{
  @Prop({ required: true })
  indicador: string; // Indicador del campo de datos

  @Prop()
  observation?: string; // Observación del campo de datos (opcional)
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

  @Prop({ type: [Question] })
  questions: Question[]; // Array de preguntas dentro de la sección

  @Prop({ type: [data] })
  data: data[]; 

  @Prop({ type: String })
  observations?: string; // Observaciones de la sección (opcional)
}

// Esquema principal para el cuestionario sin respuestas
@Schema({ timestamps: true })
export class Questionnaire extends Document {

  @Prop({ required: true })
  name: string; // Nombre del cuestionario (ej. "Check List Equipos")

  @Prop({ type: [Section], required: true })
  sections: Section[]; // Array de secciones dentro del cuestionario

  @Prop({ default: Date.now })
  createdAt?: Date; // Fecha de creación (auto generado por timestamps)

  @Prop()
  updatedAt?: Date; // Fecha de actualización (auto generado por timestamps)
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);
