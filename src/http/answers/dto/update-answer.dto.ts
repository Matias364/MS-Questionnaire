import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDTO } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(CreateAnswerDTO) {}
