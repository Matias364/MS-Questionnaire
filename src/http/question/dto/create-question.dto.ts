import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  questionText: string; 

  @IsNotEmpty()
  questionSection: String; //id de la seccion

  @IsOptional()
  @IsString()
  questionObs?: string; // Observación de la pregunta (opcional)
}
