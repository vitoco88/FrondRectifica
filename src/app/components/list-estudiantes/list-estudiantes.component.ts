import { CommonModule } from '@angular/common';
import { AfterRenderRef, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ListApoderadosComponent } from '../list-apoderados/list-apoderados.component';
import { AppComponent } from '../../app.component';
import { SharedService } from '../../services/shared.service';
//import { console } from 'node:inspector';


@Component({
  selector: 'app-list-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProgressBarComponent],
  templateUrl: './list-estudiantes.component.html',
  styleUrl: './list-estudiantes.component.css',
  providers: [EstudianteService, ToastrService]
})
export class ListEstudiantesComponent implements OnInit, AfterViewInit, AfterRenderRef {


  // Variable estática
  static VariableEstatica: string = '';
  selectedValue1: string = '02'; // Valor inicial seleccionado
  loading: boolean = false;

  static valorBuquedaStatica: string = '';
  valorBuqueda: string = '';
  /*
    listEstudiantes: Estudiante[] = [
      { tCodEstudiante: '0001', tNroDocumento: '45025880', tApellidosNombres: 'CONDORENA RONDON VICTOR', tDetNivel: 'SECUNDARIA', tDetEstadoReg: 'Procesado' }
    ];
  */

  listEstudiantes: Estudiante[] = [];
  tNroDocumento: string = '';
  constructor(private _estudianteService: EstudianteService, private router: Router, private toastr: ToastrService, private sharedService: SharedService) {



    //   console.log("variba " + AppComponent.ValorBusqueda);
  }
  destroy(): void {
    //   console.log('Method not implemented.3');
  }




  @ViewChild('myInput', { static: false }) inputRef!: ElementRef<HTMLInputElement>;


  ngAfterViewInit(): void {
    //  console.log('Method not implemented.2');

   // this.inputRef.nativeElement.focus();
  }

  onEnter(): void {
    // console.log('¡Enter presionado!');
    if (this.tNroDocumento.length > 4) {
      this.getListEstudiantes();
    }
    else {
      this.toastr.info('Escriba un documento valido.', 'Información');
    }
  }

  ngOnInit(): void {



    // Al regresar, obtén el valor compartido
    const value = this.sharedService.getValue();
    if (value) {
      this.tNroDocumento = value;
      this.sharedService.clearValue(); // Limpia el valor compartido
    }

    else {


      //   console.log("variba nro documento" + ListEstudiantesComponent.VariableEstatica);
      //  console.log("variba1 " + this.selectedValue1);

      this.tNroDocumento = ListEstudiantesComponent.VariableEstatica;

      if (ListEstudiantesComponent.valorBuquedaStatica.length > 0) {
        this.selectedValue1 = ListEstudiantesComponent.valorBuquedaStatica;
      }
      else {
        this.selectedValue1 = "02";
      }
      // 62960109


      // console.log('hola');

      if (this.selectedValue1 == '01') {
        this.loading = true;
        this.tNroDocumento = ListEstudiantesComponent.VariableEstatica;
        this._estudianteService.getEstudiantes(ListEstudiantesComponent.VariableEstatica).subscribe((data) => {
          this.listEstudiantes = data;
          this.loading = false;
          //   console.log(data);
        })
      }

      if (this.selectedValue1 == '02') {
        this.loading = true;
        this._estudianteService.getEstudiantesbyEstudent(this.tNroDocumento).subscribe((data) => {
          this.listEstudiantes = data;
          //  console.log(data);
          this.loading = false;
        });
      }
    }

  }




  onSelectChangeBusqueda(event: Event): void {
 /*   const selectElement = event.target as HTMLSelectElement;
    this.valorBuqueda = selectElement.value;
    console.log(selectElement.value); // Ahora puedes acceder a 'value' con seguridad
*/  }


  getListEstudiantes() {
    const selectElement = document.getElementById("opBusqueda") as HTMLSelectElement;

    if (selectElement.value.length > 1) {
      this.valorBuqueda = selectElement.value; // Valor seleccionado

      this.selectedValue1 = this.valorBuqueda;
      // console.log(this.selectedValue1);
      if (this.tNroDocumento.length > 7) {
        //   console.log(this.valorBuqueda);
        if (this.valorBuqueda == '01') {
          this.loading = true;
          this._estudianteService.getEstudiantes(this.tNroDocumento).subscribe((data) => {
            this.listEstudiantes = data;
            this.loading = false;
            ListEstudiantesComponent.VariableEstatica = this.tNroDocumento;
            ListEstudiantesComponent.valorBuquedaStatica = this.selectedValue1;
            //   console.log(data);
          });
        }
        if (this.valorBuqueda == '02') {
          this.loading = true;
          this._estudianteService.getEstudiantesbyEstudent(this.tNroDocumento).subscribe((data) => {
            this.listEstudiantes = data;
            //  console.log(data);
            this.loading = false;
            ListEstudiantesComponent.VariableEstatica = this.tNroDocumento;
            ListEstudiantesComponent.valorBuquedaStatica = this.selectedValue1;

            // console.log(AppComponent.ValorBusqueda  + " copiado");
            // selectElement.value = AppComponent.ValorBusqueda; 
          });

          // selectElement.value = this.valorBuqueda;
        }
      }
      else {
        this.listEstudiantes = [];
        this.toastr.error("Ingrese un Documento Valido", "Información")
      }
    } else {
      this.listEstudiantes = [];
      this.toastr.error("Ingrese Tipo de Busqueda", "Información")
    }


    //  console.log(selectElement.value);
    //  selectElement.value = this.valorBuqueda;



    /*
    if (this.tNroDocumento.length > 7) {
      //   console.log(this.valorBuqueda);
      if (this.valorBuqueda == '01') {
        this.loading = true;
        this._estudianteService.getEstudiantes(this.tNroDocumento).subscribe((data) => {
          this.listEstudiantes = data;
          this.loading = false;
          ListEstudiantesComponent.VariableEstatica = this.tNroDocumento;
          //   console.log(data);
        });
      }
      if (this.valorBuqueda == '02') {
        this.loading = true;
        this._estudianteService.getEstudiantesbyEstudent(this.tNroDocumento).subscribe((data) => {
          this.listEstudiantes = data;

          //  console.log(data);
          this.loading = false;
          ListEstudiantesComponent.VariableEstatica = this.tNroDocumento;

        });
      }
    }
    else {
      this.toastr.error("Ingrese un Documento Valido", "Información")
    }


    */
  }
}

