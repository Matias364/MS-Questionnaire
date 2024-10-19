import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionnaireDTO } from './create-questionnaire.dto';

export class UpdateQuestionnaireDto extends PartialType(CreateQuestionnaireDTO) {}
