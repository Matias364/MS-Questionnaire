import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerDTO } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from 'src/schemas/answers.schema';
import * as fs from 'fs';
import * as path from 'path';
import { error } from 'console';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<Answer>,
  ) {}

// Función para crear una respuesta en la base de datos
async createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<Answer> {
  const { questionnaireId, userId, name, data, sections , images} = createAnswerDTO;

  const urlImages = await this.saveBase64Image(images!, name);

  // Crear una nueva instancia del modelo Answer con el DTO
  const newAnswer = new this.answerModel({
    questionnaireId,
    userId,
    name,
    data,
    sections,
    images: urlImages,
  });

  // Guardar la nueva respuesta en la base de datos
  return newAnswer.save();
}

async saveBase64Image(imageBase64Array: string[], imageNamePrefix: string): Promise<string[]> {
  const imagesPaths: string[] = []; 
  try {
    // Crear una carpeta si no existe
    //Posible error al guardar las imagenes, se sobreescriben y no cambian el nombre
    const folderPath = path.join(__dirname, 'images');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    for (let i = 0; i < imageBase64Array.length; i++) {
      const imageBase64 = imageBase64Array[i];
      const base64Data = imageBase64.split(';base64,').pop();

      if (!base64Data) {
        throw new Error(`La cadena base64 de la imagen ${i + 1} no es válida`);
      }

      // Generar un nombre único para la imagen
      const imageName = `${imageNamePrefix}_image_${i + 1}.jpg`; // Usamos el índice para dar nombres únicos
      const filePath = path.join(folderPath, imageName);

      // Escribir el archivo en disco
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

      console.log(`Imagen ${i + 1} guardada correctamente en la ruta ${filePath}`); //Eliminar los console.log cuando funcione todo bien

      imagesPaths.push(filePath);
    }
  } catch (error) {
    console.error('Error al guardar la imagen:', error);
  }
  
  return imagesPaths;
}

//funcion para obtener nombre, fecha de creacion y observacion de patente de un usuario
async getAnswersByUser(userId: string): Promise<{ 
  name: string; 
  createdAt: Date; 
  patenteObservation: string | null; 
}[]> {
  return this.answerModel
    .find({ userId })
    .select('name createdAt sections')
    .lean() // Asegura que devuelve objetos simples
    .exec()
    // Mapea las respuestas para extraer el nombre, la fecha de creación y la observación de la patente
    //el then se usa para mapear las respuestas
    .then(answers =>
      answers.map(answer => {
        const dataSection = answer.sections?.find(
          (section: any) => section.title === 'data' // Encuentra la sección con título "data"
        );

        const patenteData = dataSection?.data?.find(
          (dataItem: any) => dataItem.indicador === 'Patente' // Busca el indicador "Patente"
        );

        return {
          name: answer.name,
          createdAt: answer.createdAt,
          patenteObservation: patenteData?.observation || null, // Devuelve la observación o `null`
        };
      })
    );
}

// Función para obtener todas las respuestas de un usuario
async getAnswersByUserFull(userId: string): Promise<Answer[]> {
  return this.answerModel.find({ userId }).exec(); 
}

//funcion para obtener respuesta por id
async getAnswerById(id: string): Promise<Answer> {
  const answer = await this.answerModel.findById(id).exec();
  if (!answer) {
    throw new NotFoundException(`Answer with ID ${id} not found`);
  }
  return answer;
}

}

