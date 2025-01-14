import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';
import { Distrito } from '../interfaces/distritos';
import { TipoDocumento } from '../interfaces/tipodocumento';
import { Nivel } from '../interfaces/nivel';
import { Grado } from '../interfaces/grado';
import { Apoderado } from '../interfaces/apoderado';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {


  private apiUrl = 'http://161.132.68.10:3001/api/estudiantes/';

  private apiUrlgetByNro = 'http://161.132.68.10:3001/api/estudiantes/id/';

  private apiUrlValNro = 'http://161.132.68.10:3001/api/estudiantes/val/';
  private apiReg = 'http://161.132.68.10:3001/api/estudiantes/reg/reg/';
  // 
  // Ruta del backend
  private apiUrldlt = 'http://161.132.68.10:3001/api/estudiantes/cod/distritos';

  private apiUrlupdt = 'http://161.132.68.10:3001/api/estudiantes/cod/';

  private apiNivel = 'http://161.132.68.10:3001/api/estudiantes/cod/nivel';

  private apiTipoDoc = 'http://161.132.68.10:3001/api/estudiantes/cod/tipodocumento';

  private apiGrado = 'http://161.132.68.10:3001/api/estudiantes/cod/GRADO';


  constructor(private http: HttpClient) { }

  // Método para obtener productos desde el backend
  getEstudiantes(tNroDocumento: string,): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl + tNroDocumento);
  }

  // Método para obtener productos desde el backend
  getEstudiantesbyEstudent(tNroDocumento: string,): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrlgetByNro + tNroDocumento);
  }




  getTipoDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(this.apiTipoDoc);
  }


  getNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.apiNivel);
  }


  getGrados(): Observable<Grado[]> {
    return this.http.get<Grado[]>(this.apiGrado);
  }

  getDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.apiUrldlt);
  }
  getEstudiante(id: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(this.apiUrlupdt + id);
  }
  UpdateEstudiante(tCodEstudiante: string, estudiante: Estudiante): Observable<void> {
    return this.http.put<void>(this.apiUrlupdt + tCodEstudiante, estudiante)
  }

  ValidaNroDocumentoEst(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrlValNro + id);
  }


  MatricularEstudiante(estudiante: Estudiante, padre: Apoderado, madre: Apoderado): Observable<any> {
    const body = {
      estudiante: estudiante,
      padre: padre,
      madre: madre
    };
    return this.http.post<any>(this.apiReg, body);
  }






}
