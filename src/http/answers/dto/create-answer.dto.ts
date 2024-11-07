import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class DataDTO {
  @IsString()
  indicador: string;

  @IsString()
  @IsOptional() // Hacer opcional en caso de que no todas las respuestas tengan observación
  observation: string;
}

export class QuestionDTO {
  @IsString()
  text: string;

  @IsArray()
  @IsString({ each: true })
  alternatives: string[];

  @IsString()
  answer: string;

  @IsString()
  observation: string;
}

export class SectionDTO {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDTO)
  questions: QuestionDTO[];

  @IsString()
  observations: string;
}

export class CreateAnswerDTO {
  @IsString()
  questionnaireId: string; // ID del cuestionario original

  @IsString()
  userId: string; // ID del usuario que responde

  @IsString()
  name: string; // Nombre del cuestionario

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DataDTO)
  data: DataDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDTO)
  sections: SectionDTO[];
}
