import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class DataDTO {
  @IsString()
  @IsNotEmpty()
  indicador: string; // Indicador de la data

  @IsString()
  @IsOptional()
  respuesta: string; // Respuesta de la data
}

export class QuestionDTO {
  @IsString()
  @IsNotEmpty()
  text: string; // El texto de la pregunta

  @IsArray()
  @IsNotEmpty()
  alternatives: string[]; // Las alternativas de respuesta (ej. ["Sí", "No"])

  @IsOptional()
  @IsString()
  observation: string; // Por si se debe mencionar algo 

}

export class SectionDTO {
  @IsString()
  @IsNotEmpty()
  title: string; // El título de la sección (ej. "Estado General")

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataDTO)
  data: DataDTO[]; // Array de datos iniciales

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  questions: QuestionDTO[]; // Array de preguntas dentro de la sección

  @IsString()
  @IsOptional()
  observations?: string; // Observaciones de la sección (opcional)
}

export class CreateQuestionnaireDTO {
  @IsString()
  @IsNotEmpty()
  name: string; // Nombre del cuestionario (ej. "Check List Equipos")

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDTO)
  sections: SectionDTO[]; // Array de secciones dentro del cuestionario
}
