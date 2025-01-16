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


  private apiUrl = 'http://localhost:3000/api/estudiantes/';

  private apiUrlgetByNro = 'http://localhost:3000/api/estudiantes/id/';

  private apiUrlValNro = 'http://localhost:3000/api/estudiantes/val/';
  private apiReg = 'http://localhost:3000/api/estudiantes/reg/reg/';
  // 
  // Ruta del backend
  private apiUrldlt = 'http://localhost:3000/api/estudiantes/cod/distritos';

  private apiUrlupdt = 'http://localhost:3000/api/estudiantes/cod/';

  private apiNivel = 'http://localhost:3000/api/estudiantes/cod/nivel';

  private apiTipoDoc = 'http://localhost:3000/api/estudiantes/cod/tipodocumento';

  private apiGrado = 'http://localhost:3000/api/estudiantes/cod/GRADO';


  private apiPadre = 'http://localhost:3000/api/estudiantes/padre/';

  private apiMadre = 'http://localhost:3000/api/estudiantes/madre/';


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

  getPadre(id: string): Observable<Apoderado> {
    return this.http.get<Apoderado>(this.apiPadre + id);
  }


  getMadre(id: string): Observable<Apoderado> {
    return this.http.get<Apoderado>(this.apiMadre + id);
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
