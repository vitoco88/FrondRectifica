import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Estudiante } from '../../interfaces/estudiante';
import { Router } from '@angular/router';
import { Distrito } from '../../interfaces/distritos';
import { EstudianteService } from '../../services/estudiante.service';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';
import { AddEditApoderadosComponent } from '../add-edit-apoderados/add-edit-apoderados.component';
import { AddEditEstudianteComponent } from '../add-edit-estudiante/add-edit-estudiante.component';


@Component({
  selector: 'app-list-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProgressBarComponent],
  templateUrl: './list-estudiantes.component.html',
  styleUrl: './list-estudiantes.component.css',
  providers: [EstudianteService, ToastrService]
})
export class ListEstudiantesComponent implements OnInit {


  // Variable estática
  static VariableEstatica: string = '';

  loading: boolean = false;

  /*
    listEstudiantes: Estudiante[] = [
      { tCodEstudiante: '0001', tNroDocumento: '45025880', tApellidosNombres: 'CONDORENA RONDON VICTOR', tDetNivel: 'SECUNDARIA', tDetEstadoReg: 'Procesado' }
    ];
  */

  listEstudiantes: Estudiante[] = [];
  tNroDocumento: string = '';
  constructor(private _estudianteService: EstudianteService, private router: Router) {

  }

  ngOnInit(): void {

   console.log('hola');
    if (ListEstudiantesComponent.VariableEstatica) {
      this.loading = true;

      this.tNroDocumento = ListEstudiantesComponent.VariableEstatica;
      this._estudianteService.getEstudiantes(ListEstudiantesComponent.VariableEstatica).subscribe((data) => {
        this.listEstudiantes = data;
        this.loading = false;
        //   console.log(data);
      })
    }
  }

  getListEstudiantes() {
console.log('hola2');
   
    this.loading = true;
    this._estudianteService.getEstudiantes(this.tNroDocumento).subscribe((data) => {
      this.listEstudiantes = data;
      this.loading = false;
      ListEstudiantesComponent.VariableEstatica = this.tNroDocumento;
      //   console.log(data);

    });
  };




}
