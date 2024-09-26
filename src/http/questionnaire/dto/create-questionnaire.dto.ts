import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer'; // Importamos para el uso de ValidateNested en arrays
import { QuestionDto } from './create-question.dto';

export class CreateQuestionnaireDto {
  @IsString()
  title: string; // Título del formulario, ej. "Check List Equipos"

  @IsString()
  description: string; // Breve descripción del formulario
  
  @IsArray() // Validamos que sea un array de preguntas
  @ValidateNested({ each: true }) // Validamos que cada elemento del array sea un objeto válido
  @Type(() => QuestionDto) // Necesario para transformar los objetos
  questions: QuestionDto[]; // Lista de preguntas del formulario
}
