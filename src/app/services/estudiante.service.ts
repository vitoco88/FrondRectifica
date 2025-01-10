import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';
import { Distrito } from '../interfaces/distritos';
import { TipoDocumento } from '../interfaces/tipodocumento';
import { Nivel } from '../interfaces/nivel';
import { Grado } from '../interfaces/grado';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {


  private apiUrl = 'http://161.132.68.10:3000/api/estudiantes/';
  // 
  // Ruta del backend
  private apiUrldlt = 'http://161.132.68.10:3000/api/estudiantes/cod/distritos';

  private apiUrlupdt = 'http://161.132.68.10:3000/api/estudiantes/cod/';

  private apiNivel = 'http://161.132.68.10:3000/api/estudiantes/cod/nivel';

  private apiTipoDoc = 'http://161.132.68.10:3000/api/estudiantes/cod/tipodocumento';

  private apiGrado = 'http://161.132.68.10:3000/api/estudiantes/cod/GRADO';


  constructor(private http: HttpClient) { }

   // Método para obtener productos desde el backend
   getEstudiantes(tNroDocumento: string): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl+ tNroDocumento);
  }

  getTipoDocumentos():Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(this.apiTipoDoc);
  }


  getNiveles():Observable<Nivel[]>{
    return this.http.get<Nivel[]>(this.apiNivel);
  }


  getGrados():Observable<Grado[]>{
    return this.http.get<Grado[]>(this.apiGrado);
  }

  getDistritos():Observable<Distrito[]>{
    return this.http.get<Distrito[]>(this.apiUrldlt);
  }
  getEstudiante(id:string) : Observable<Estudiante>{
    return this.http.get<Estudiante>(this.apiUrlupdt+id);
  }
  UpdateEstudiante(tCodEstudiante: string, estudiante: Estudiante): Observable<void>{
    return this.http.put<void>(this.apiUrlupdt+tCodEstudiante, estudiante)
  }
}
