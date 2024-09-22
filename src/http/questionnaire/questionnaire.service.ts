import { Injectable } from '@nestjs/common';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { UpdateQuestionnaireDto } from './dto/update-questionnaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/schemas/questionnaire.schema';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>) {}

  async create(createQuestionnaireDto: { title: string; questions: string[] }): Promise<Questionnaire> {
    const newQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return newQuestionnaire.save();
  }

  findAll() {
    return `This action returns all questionnaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionnaire`;
  }

  update(id: number, updateQuestionnaireDto: UpdateQuestionnaireDto) {
    return `This action updates a #${id} questionnaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionnaire`;
  }
}
