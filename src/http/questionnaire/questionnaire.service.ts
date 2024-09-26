import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/schemas/questionnaire.schema';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';


@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  // Crear un nuevo cuestionario
  async create(createQuestionnaireDto: CreateQuestionnaireDto): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return createdQuestionnaire.save();
  }

  // Obtener todos los cuestionarios
  async findAll(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find().exec();
  }

  // Obtener un cuestionario por ID
  async findOne(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findById(id).exec();
  }
}
