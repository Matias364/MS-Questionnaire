import { IsArray, IsNotEmpty, IsString } from 'class-validator';
export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    questionnaireId: string;
  
    @IsString()
    @IsNotEmpty()
    userId: string;
  
    @IsArray()
    @IsNotEmpty({ each: true })
    responses: string[];
  }