import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];// es para obtener el token del header

    // Verificar si el header Authorization está presente
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // Extraer el token del header 'Authorization'
    const token = authorizationHeader.split(' ')[1]; // Formato: 'Bearer <token>'

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    // Hacer la llamada HTTP al microservicio IAM para verificar el token
    return this.httpService.post(`${process?.env?.MS_IAM as string}/check`, {}, { // Enviar el token en los headers
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
    }).pipe(
      map(response => {
        console.log(`Respuesta del servicio IAM: ${JSON.stringify(response.data)}`);

        // Verificar si el estado es 201 y hay datos válidos en la respuesta
        if (response.status === 201 && response.data) {
          return true; // Token válido, permitir el acceso
        }

        // En caso de no ser válido, lanzar una excepción de no autorizado
        throw new UnauthorizedException('Invalid token');
      }),
      catchError(error => {
        console.error(`Error en la verificación del token: ${error.message}`);
        throw new UnauthorizedException('Token verification failed');
      })
    );
  }
}
