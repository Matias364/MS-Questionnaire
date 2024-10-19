import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split(' ')[1];
  
      const response = await lastValueFrom(
        this.httpService.get(
            
          `${this.configService.get<string>('MS_IAM')}/check`,
          
          {
            headers: { authorization: `Bearer ${token}` },
          }
        )
      );
  
      console.log('Respuesta del check:', response.data); // Verifica la respuesta del microservicio
      return true;
    } catch (error) {
      console.log('Error en AuthGuard:', error.message); // Imprime el error
      throw new UnauthorizedException();
    }
  }
}
