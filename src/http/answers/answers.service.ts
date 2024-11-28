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
  constructor(@InjectModel(Answer.name) private answerModel: Model<Answer>) {}

  //funcion para crear respuesta
  async createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<Answer> {
    const { questionnaireId, userId, name, sections, images, locationA} = createAnswerDTO;
  
    const newAnswer = new this.answerModel({
      questionnaireId,
      userId,
      name,
      sections,
      images, // Guarda las imágenes procesadas
      locationA
    });
  
    return newAnswer.save();
  }
  

  async processAndSaveImage(base64Image: string, answerId: string): Promise<string> {
    try {
      // Validar que la imagen tiene un formato base64 correcto
      if (!base64Image || !base64Image.startsWith('data:image/')) {
        throw new Error('La imagen proporcionada no tiene un formato válido.');
      }
  
      // Extraer el tipo de archivo (mime type)
      const mimeTypeMatch = base64Image.match(/data:(image\/\w+);base64,/);
      if (!mimeTypeMatch) {
        throw new Error('El encabezado Base64 de la imagen es inválido.');
      }
      const mimeType = mimeTypeMatch[1]; // Ejemplo: "image/jpeg"
      const extension = mimeType.split('/')[1]; // Ejemplo: "jpeg"
  
      // Extraer los datos base64
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      if (!base64Data) {
        throw new Error('La cadena base64 de la imagen está vacía.');
      }
  
      // Crear la carpeta de destino si no existe
      const folderPath = path.join(__dirname, '..', '..', '..', 'uploads');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
  
      // Generar un nombre único para el archivo
      const fileName = `image_${answerId}_${Date.now()}.${extension}`;
      const filePath = path.join(folderPath, fileName);
  
      // Guardar el archivo en formato base64
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
  
      // Generar la URL pública de la imagen
      const imageUrl = `http://localhost:3001/uploads/${fileName}`;
      console.log(`Imagen guardada correctamente: ${imageUrl}`);
      return imageUrl;
    } catch (error) {
      console.error('Error al procesar la imagen:', error.message);
      throw new Error('Error al procesar la imagen');
    }
  }
  



  //funcion para obtener nombre, fecha de creacion y observacion de patente de un usuario
  async getAnswersByUser(userId: string): Promise<
    {
      _id: string;
      name: string;
      createdAt: Date;
      patenteObservation: string | null;
    }[]
  > {
    return (
      this.answerModel
        .find({ userId })
        .select('name createdAt sections')
        .sort({ createdAt: -1 }) // Ordena por fecha descendente
        .lean() // Asegura que devuelve objetos simples
        .exec()
        // Mapea las respuestas para extraer el nombre, la fecha de creación y la observación de la patente
        //el then se usa para mapear las respuestas
        .then((answers) =>
          answers.map((answer) => {
            const dataSection = answer.sections?.find(
              (section: any) => section.title === 'data', // Encuentra la sección con título "data"
            );

            const patenteData = dataSection?.data?.find(
              (dataItem: any) => dataItem.indicador === 'Patente', // Busca el indicador "Patente"
            );

            return {
              _id: answer._id.toString(),
              name: answer.name,
              createdAt: answer.createdAt,
              patenteObservation: patenteData?.observation || null, // Devuelve la observación o `null`
            };
          }),
        )
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
