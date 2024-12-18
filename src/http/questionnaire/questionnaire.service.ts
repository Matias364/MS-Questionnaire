import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Questionnaire } from 'src/schemas/questionnaire.schema';
import { CreateQuestionnaireDTO } from './dto/create-questionnaire.dto';


@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectModel(Questionnaire.name) private questionnaireModel: Model<Questionnaire>,
  ) {}

  // Crear un nuevo cuestrionario
  async create(createQuestionnaireDto: CreateQuestionnaireDTO): Promise<Questionnaire> {
    const createdQuestionnaire = new this.questionnaireModel(createQuestionnaireDto);
    return createdQuestionnaire.save();
  }

  // Obtener todos los cuestionarios
  async findAllName(): Promise<Questionnaire[]> {
    return this.questionnaireModel.find({},'name').exec();
  }

  // Obtener un cuestionario por ID
  async findOne(id: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findById(id).exec();
  }

  //Obetener un cuestionario por nombre
  async findOneByName(name: string): Promise<Questionnaire | null> {
    return this.questionnaireModel.findOne({name: name}).exec();
  }
}
