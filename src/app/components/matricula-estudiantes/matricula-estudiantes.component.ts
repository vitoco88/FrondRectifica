import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../../services/estudiante.service';
import { TipoDocumento } from '../../interfaces/tipodocumento';
import { Nivel } from '../../interfaces/nivel';
import { Grado } from '../../interfaces/grado';
import { Distrito } from '../../interfaces/distritos';

@Component({
  selector: 'app-matricula-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './matricula-estudiantes.component.html',
  styleUrl: './matricula-estudiantes.component.css'
})
export class MatriculaEstudiantesComponent implements OnInit {

  form: FormGroup;
  formP: FormGroup;


  listaDistritos: Distrito[] = [
    { tCodigo: '01', tDetallado: 'Arequipa' }
  ];

  listaGrados: Grado[] = [
    { tCodigo: '01', tDetallado: 'Arequipa' }
  ];



  listaNiveles: Nivel[] = [
    { tCodigo: '01', tDetallado: 'Arequipa' }
  ];



  listaTipoDoc: TipoDocumento[] = [
    { tCodigo: '01', tDetallado: 'Arequipa' }
  ];
  constructor(private fb: FormBuilder, private fb2: FormBuilder,
    private _estudianteService: EstudianteService,
    private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      tDireccion: ['', Validators.required],
      tTelefono: ['', Validators.required],
      // option1: new FormControl(''),
      option1: [''],
      option: [''],
      option2: [''],
      option3: [''],
      tApellidosNombres: '',
      tNroDocumento: '',
      tEmail: '',
      tSexo: '',
      fNacimiento: '',
      opRatificacion: [''],
      opDiscapacidad: [''],
      opExoRe: [''],
      tDiscapacidadObs: '',
      tDetSexo: '',
      tAPaterno: '',
      tAMaterno: '',
      tNombres: '',
      opSeguro: [''],
      opConvive: [''],
      opTieneHermano: [false],
      tNroHermanos: [''],
      opPCargo: ['']
    })


    this.formP = this.fb2.group({
      tAMaternoPadre: '',
      tNombresPadre: '',
      option1Padre: [''],
      tNroDocumentoPadre: '',
      fNacimientoPadre: '',
      tDireccionPadre: '',
      tTelefonoPadre: '',
      tEmailPadre: '',
      tAPaternoPadre: '',


    })



    // Escuchar cambios en opTieneHermano para controlar el estado del input
    this.form.get('opTieneHermano')?.valueChanges.subscribe(value => {
      if (value === false) {
        this.form.get('tNroHermanos')?.disable(); // Deshabilitar el input si es false
      } else {
        this.form.get('tNroHermanos')?.enable(); // Habilitar el input si es true
      }
    });


  }
  ngOnInit(): void {
    this.getDistritos();
    this.getTipoDocumentos();
    this.getNiveles();
    this.getGrados();
    // Inicializar el estado del input según el valor de opTieneHermano
    this.setInputState();
    // Escuchar cambios en opTieneHermano para controlar el estado del input
    this.form.get('opTieneHermano')?.valueChanges.subscribe(() => {
      this.setInputState();
    });
  }

  operation: boolean = false;
  // Función para habilitar/deshabilitar el input
  private setInputState() {
    const tieneHermano = this.form.get('opTieneHermano')?.value;
    const nombreHermanoControl = this.form.get('tNroHermanos');

    if (tieneHermano === false) {
      // nombreHermanoControl?.disable(); // Deshabilitar el input si es false
      this.operation = false;
    } else {
      //      nombreHermanoControl?.enable(); // Habilitar el input si es true
      this.operation = true;
    }
  }

  modalVisible: boolean = false;  // Controla si el modal está visible o no
  nombre: string = '';  // Variable para el formulario

  // Función para abrir el modal
  openModal() {
    const modal = document.getElementById("MyModal");
    if (modal != null) {
      modal.style.display = "flex"
    }
  }

  // Función para cerrar el modal
  closeModal() {
    const modal = document.getElementById("MyModal");
    if(modal != null){
      modal.style.display = "none"
    }
  }

  onSubmit(): void {
    //  console.log('Formulario enviado:', this.nombre, this.apellido);
    // Aquí puedes manejar el envío del formulario
    // Puedes cerrar el modal programáticamente si es necesario
    // (por ejemplo, usando Bootstrap's modal methods)
  }

  // Método para manejar el cambio de selección
  onSelectionChange(event: any): void {
    const valorSeleccionado = event.target.value === 'true'; // Asegurarse de que sea booleano
    this.operation = valorSeleccionado;
    //console.log('Valor de miVariable:', this.miVariable); // Solo se asigna true si selecciona "SI"
  }


  getDistritos() {
    this._estudianteService.getDistritos().subscribe((data) => {
      this.listaDistritos = data;
      //    console.log(data);
    })
  };





  getNiveles() {
    this._estudianteService.getNiveles().subscribe((data) => {
      this.listaNiveles = data;
      console.log(data);
    })
  };




  getGrados() {
    this._estudianteService.getGrados().subscribe((data) => {
      this.listaGrados = data;
      //    console.log(data);
    })
  };




  getTipoDocumentos() {
    this._estudianteService.getTipoDocumentos().subscribe((data) => {
      this.listaTipoDoc = data;
      console.log(data);
    })
  };
}
