import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  questions: string[];
}
