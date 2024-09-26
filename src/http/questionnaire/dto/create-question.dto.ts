import { IsOptional, IsString, IsIn, IsArray } from 'class-validator';

export class QuestionDto {
  @IsString()
  questionText: string; // El texto de la pregunta

  @IsIn(['text', 'checkbox', 'radio']) // Aseguramos que sea uno de los tipos permitidos
  questionType: 'text' | 'checkbox' | 'radio'; // Tipo de pregunta

  @IsOptional() // Solo es obligatorio si la pregunta es de tipo 'radio' o 'checkbox'
  @IsArray()
  @IsString({ each: true }) // Validamos que cada opción sea una cadena de texto
  options?: string[]; // Opciones (si es de tipo 'radio' o 'checkbox')
}
