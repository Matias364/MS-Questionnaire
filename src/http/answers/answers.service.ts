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

  // Función para crear una respuesta en la base de datos
  async createAnswer(createAnswerDTO: CreateAnswerDTO): Promise<Answer> {
    const { questionnaireId, userId, name, data, sections, images } =
      createAnswerDTO;

    const urlImages =
      images?.map(
        async (image: string) => await this.processAndSaveImage(image, name), // Usamos el método processAndSaveImage para guardar las imágenes
      ) || [];

    const imagesUrls = await Promise.all(urlImages); // Esperamos a que todas las imágenes sean guardadas

    // Crear una nueva instancia del modelo Answer con el DTO
    const newAnswer = new this.answerModel({
      questionnaireId,
      userId,
      name,
      data,
      sections,
      images: imagesUrls,
    });

    // Guardar la nueva respuesta en la base de datos
    return newAnswer.save();
  }

  async processAndSaveImage(
    base64Image: string,
    answerId: string,
  ): Promise<string> {
    try {
      // Extraer la parte base64 de la cadena (sin el encabezado 'data:image/...;base64,')
      const base64Data = base64Image.split(';base64,').pop();

      if (!base64Data) {
        throw new Error('La cadena base64 no es válida');
      }

      // Crear una carpeta para las imágenes si no existe
      const folderPath = path.join(__dirname, '..', '..', '..', 'uploads');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Generar un nombre único para la imagen (con base en la fecha y el ID de la respuesta)
      const fileName = `image_${answerId}_${Date.now()}.jpg`;
      const filePath = path.join(folderPath, fileName);

      // Escribir la imagen en el sistema de archivos
      fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });

      console.log(`Imagen guardada correctamente en la ruta ${filePath}`);

      // Construir la URL de la imagen para usarla en la base de datos
      const imageUrl = `http://localhost:3001/uploads/${fileName}`;
      console.log(`URL de la imagen: ${imageUrl}`);

      // Retornar la URL o ruta de la imagen guardada
      return imageUrl;
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      throw new Error('Error al procesar la imagen');
    }
  }

  //funcion para obtener nombre, fecha de creacion y observacion de patente de un usuario
  async getAnswersByUser(userId: string): Promise<
    {
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
