import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Subdocumento para estructura de `data`
@Schema()
class DataField {
  @Prop()
  indicador: string; // Indicador del campo de datos

  @Prop()
  observation: string; // Observación del campo de datos
}

// Subdocumento para las preguntas dentro de las secciones
@Schema()
class Question {
  @Prop({ required: true })
  text: string; // El texto de la pregunta

  @Prop({ type: [String], required: true })
  alternatives: string[]; // Las alternativas de respuesta (ej. ["Sí", "No"])

  @Prop()
  answer?: string; // La respuesta del usuario

  @Prop()
  observation?: string; // La observación del usuario
}

// Subdocumento para las secciones dentro del cuestionario
@Schema()
class Section {
  @Prop({ required: true })
  title: string; // Título de la sección

  @Prop({ type: [Question] })
  questions?: Question[]; // Array de preguntas dentro de la sección

  @Prop({ type: [DataField] }) // Definición correcta del array `data`
  data?: DataField[]; // Array de campos de datos

  @Prop()
  observations?: string; // Observación general de la sección (opcional)
}

// Esquema principal para el cuestionario con respuestas
@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ required: true })
  questionnaireId: string; // Referencia al cuestionario

  @Prop({ required: true })
  userId: string; // Referencia al usuario

  @Prop({ required: true })
  name: string; // Nombre del cuestionario

  @Prop({ type: [DataField], default: [] })
  data: DataField[]; // Array de datos iniciales

  @Prop({ type: [Section], required: true })
  sections: Section[]; // Array de secciones dentro del cuestionario
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
