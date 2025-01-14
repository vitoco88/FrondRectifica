import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../../services/estudiante.service';
import { TipoDocumento } from '../../interfaces/tipodocumento';
import { Nivel } from '../../interfaces/nivel';
import { Grado } from '../../interfaces/grado';
import { Distrito } from '../../interfaces/distritos';
import { Estudiante } from '../../interfaces/estudiante';
import { Apoderado } from '../../interfaces/apoderado';
import { NavbarComponent } from "../navbar/navbar.component";
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-matricula-estudiantes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './matricula-estudiantes.component.html',
  styleUrl: './matricula-estudiantes.component.css'
})
export class MatriculaEstudiantesComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  formP: FormGroup;
  formMadre: FormGroup;


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
  constructor(private fb: FormBuilder, private fb2: FormBuilder, private fb3: FormBuilder,
    private _estudianteService: EstudianteService, private sharedService: SharedService,
    private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      tDireccion: ['', Validators.required],
      tTelefono: ['', Validators.required],
      // option1: new FormControl(''),
      option1: ['', Validators.required],
      option: ['', Validators.required],
      //  option: new FormControl(''), 

      option2: ['', Validators.required],
      option3: ['', Validators.required],
      nCantHermanos: '',
      tNroDocumento: ['', Validators.required],
      tEmail: ['', Validators.required],
      opSexo: ['', Validators.required],
      fNacimiento: ['', Validators.required],
      opDiscapacidad: ['', Validators.required],
      opExoRe: ['', Validators.required],
      tDiscapacidadObs: '',
      // tDetSexo: ['', Validators.required],
      tAPaterno: ['', Validators.required],
      tAMaterno: ['', Validators.required],
      tNombres: ['', Validators.required],
      opSeguro: ['', Validators.required],
      opConvive: ['', Validators.required],
      opTieneHermano: [false],
      tNroHermanos: [''],
      opPCargo: ['', Validators.required]
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

    this.formMadre = this.fb3.group({
      tAMaternoMadre: '',
      tNombresMadre: '',
      option1Madre: [''],
      tNroDocumentoMadre: '',
      fNacimientoMadre: '',
      tDireccionMadre: '',
      tTelefonoMadre: '',
      tEmailMadre: '',
      tAPaternoMadre: '',


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


  @ViewChild('myInput', { static: false }) inputRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    //  throw new Error('Method not implemented.');
    this.inputRef.nativeElement.focus();


  }
  ngOnInit(): void {
    this.getDistritos();
    this.getTipoDocumentos();
    this.getNiveles();
    this.getGrados();
  }

  operation: boolean = false;


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
    if (modal != null) {
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
    console.log(valorSeleccionado);
    if (valorSeleccionado == false) {
      this.form.get('tNroHermanos')?.setValue('');
    }
    else {
      this.form.get('tNroHermanos')?.setValue('');
    }


    this.operation = valorSeleccionado
    //console.log('Valor de miVariable:', this.miVariable); // Solo se asigna true si selecciona "SI"
  }
  // Evento de cambio en el campo de texto
  onInputChange(event: any): void {

    let currentValue = event.target.value;
    if (/^[a-zA-Z0-9]/.test(currentValue)) {
      // Reemplaza caracteres no permitidos, pero permite letras, números y espacios
      event.target.value = currentValue.replace(/[^a-zA-Z ]/g, '');
    } else {
      // Si el primer carácter no es válido, puedes limpiar el valor o manejarlo de otra manera
      event.target.value = '';
    }
  }


  getDistritos() {
    this._estudianteService.getDistritos().subscribe((data) => {
      this.listaDistritos = data;
      //    console.log(data);
    })
  };
  txtExisteObs: string = '';

  getValidadDocuEstudiante() {

    if (this.form.value.tNroDocumento != '') {
      //   this.form.value.tNroDocumento;
      //    console.log(this.form.value.tNroDocumento + " es ed");
      this._estudianteService.ValidaNroDocumentoEst(this.form.value.tNroDocumento).subscribe((data: any) => {
        // Si la respuesta es un número, puedes crear un objeto con la propiedad nCantExiste
        const response = { nCantExiste: data.nCantExiste };  // Asignamos el número a la propiedad nCantExiste         
        // console.log(data.nCantExiste);
        //   console.log("Response completo:", JSON.stringify(response, null, 2));
        //   console.log("es " + response.nCantExiste);

        if (Number(response.nCantExiste) > 0) {
          //  console.log("existe");
          this.txtExisteObs = "Estudiante ya se Encuentra Matriculado";
          const modal = document.getElementById("MyModal");
          if (modal != null) {
            modal.style.display = "flex"
          }
        }
        else {
          this.toastr.info("Estudiante No Registrado", "Información");
        }
      });
    }
    else {
      this.toastr.error("Ingrese Documento", "Información");
    }
  }


  lDiscapacidadt: boolean = false;
  lExoneradot: boolean = false;
  lHermanos: boolean = false;
  selectedHermanos?: boolean;
  MatricularEstudiante() {

    const usernameInput = this.form.get('tNroDocumento')?.value.trim();

    console.log(usernameInput);
    if (usernameInput.length < 7) {
      this.toastr.error("EL Documento del Estudiante no parece correcto", "Informacion")
      return;
    }

    const confirmar = window.confirm('¿Estás seguro de que deseas enviar los datos con \n Nro de Documento +' + usernameInput + '  ?');

    if (confirmar) {
      this.lDiscapacidadt = false;
      this.lExoneradot = false;



      if (this.form.get('opExoRe')?.value == 'SI') {
        this.lExoneradot = true;
      }
      if (this.form.get('opDiscapacidad')?.value == 'SI') {
        this.lDiscapacidadt = true;
      }
   //   if (this.form.get('opTieneHermano')?.value == 'SI') {
   //     this.lHermanos = true;
  //    }
      const selectSeguro = document.getElementById("opSeguro") as HTMLSelectElement;
      const selectSexo = document.getElementById("opSexo") as HTMLSelectElement;
      const selectVive = document.getElementById("opConvive") as HTMLSelectElement;
      const selectApoderado = document.getElementById("opPCargo") as HTMLSelectElement;

      const padre: Apoderado = {
        tApNombres: this.formP.value.tAPaternoPadre.trim() + ' ' + this.formP.value.tAMaternoPadre.trim() + ' ' + this.formP.value.tNombresPadre.trim(),
        tCodParentesco: '01',
        tCodTipoDocumento: this.formP.get('option1Padre')?.value,
        tNroDocumento: this.formP.value.tNroDocumentoPadre.trim(),
        fNacimiento: this.formP.value.fNacimientoPadre.trim(),
        tDireccion: this.formP.value.tDireccionPadre.trim(),
        tTelefono: this.formP.value.tTelefonoPadre.trim(),
        tEmail: this.formP.value.tEmailPadre.trim()
      }

      const madre: Apoderado = {
        tApNombres: this.formMadre.value.tAPaternoMadre.trim() + ' ' + this.formMadre.value.tAMaternoMadre.trim() + ' ' + this.formMadre.value.tNombresMadre.trim(),
        tCodParentesco: '02',
        tCodTipoDocumento: this.formMadre.get('option1Madre')?.value,
        tNroDocumento: this.formMadre.value.tNroDocumentoMadre.trim(),
        fNacimiento: this.formMadre.value.fNacimientoMadre.trim(),
        tDireccion: this.formMadre.value.tDireccionMadre.trim(),
        tTelefono: this.formMadre.value.tTelefonoMadre.trim(),
        tEmail: this.formMadre.value.tEmailMadre.trim()
      }
      const estudiante: Estudiante = {
        tAMaterno: this.form.value.tAMaterno.trim(),
        tAPaterno: this.form.value.tAPaterno.trim(),
        tNombres: this.form.value.tNombres.trim(),
        tSexo: selectSexo.value,
        tCodTipoDocumento: this.form.get('option1')?.value,  // option1 es tipodocumento
        tNroDocumento: this.form.value.tNroDocumento.trim(),
        fNacimiento: this.form.value.fNacimiento,
        tCodSeguro: selectSeguro.value,
        tVive: selectVive.value,
        tApoderado: selectApoderado.value,
        lHermanos: this.selectedHermanos,
        nCantHermanos: this.form.value.nCantHermanos === "" ? 0 : this.form.value.nCantHermanos,
        tDireccion: this.form.value.tDireccion.trim(),
        tTelefono: this.form.value.tTelefono.trim(),
        tEmail: this.form.value.tEmail,
        tCodDistrito: this.form.get('option')?.value,
        lExonaradoR: this.lExoneradot,
        lDiscapacidad: this.lDiscapacidadt,
        tDiscapacidadObs: this.form.get('tDiscapacidadObs')?.value.trim(),
        tCodGrado: this.form.get('option3')?.value,
        tNivel: this.form.get('option2')?.value,
        tEstadoRegistro: '03' // matriculado
      }
      if (!estudiante.fNacimiento) {
        this.toastr.warning("Ingrese fecha del estudiante", "Información");
        console.log("Ingrese fecha nacimiento del estudiante");
        return;
      }
      if (this.formP.value.tAPaternoPadre == "") {
        this.toastr.warning("Ingrese Ap. Paterno del la Padre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }
      if (this.formP.value.tAMaternoPadre == "") {
        this.toastr.warning("Ingrese Ap. Materno del Padre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }

      if (this.formP.value.tNombresPadre == "") {
        this.toastr.warning("Ingrese Nombres del Padre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }


      if (padre.tCodTipoDocumento == "") {

        this.toastr.warning("Ingrese tipo documento Padre", "Información");  // Muestra un mensaje de éxito     
        console.log("ingrese tipo documento");
        return;
      }
      if (padre.tApNombres == "") {
        this.toastr.warning("Ingrese Nombre Padres", "Información");
        console.log("Ingrese Nombre Padres");
        return;
      }

      if (padre.tNroDocumento == "") {
        this.toastr.warning("Ingrese Documento del Padre", "Información");
        console.log("Ingrese Documento");
        return;
      }
      if (!padre.fNacimiento) {
        this.toastr.warning("Ingrese fecha nacimiento padre", "Información");
        console.log("Ingrese fecha nacimiento padre");
        return;
      }
      if (padre.tDireccion == "") {
        this.toastr.warning("Ingrese Direccion Padre", "Información");
        console.log("Ingrese Direccion Padre");
        return;
      }
      if (padre.tTelefono == "") {
        this.toastr.warning("Ingrese Telefono Padre", "Información");
        console.log("Ingrese Telefono Padre");
        return;
      }
      if (padre.tEmail == "") {
        this.toastr.warning("Ingrese Correo Padre", "Información");
        console.log("Ingrese Correo del Padre");
        return;
      }



      if (this.formMadre.value.tAPaternoMadre == "") {
        this.toastr.warning("Ingrese Ap. Paterno de la Madre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }
      if (this.formMadre.value.tAMaternoMadre == "") {
        this.toastr.warning("Ingrese Ap. Materno de la Madre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }

      if (this.formMadre.value.tNombresMadre == "") {
        this.toastr.warning("Ingrese Nombres de la Madre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }

      if (madre.tCodTipoDocumento == "") {
        this.toastr.warning("Ingrese Tipo Documento de la Madre", "Información");
        console.log("ingrese tipo documento");
        return;
      }
      if (madre.tApNombres == "") {
        this.toastr.warning("Ingrese Nomres de la Madre", "Información");
        console.log("Ingrese Nombre Madre");
        return;
      }

      if (madre.tNroDocumento == "") {
        this.toastr.warning("Ingrese Documento de la Madre", "Información");
        console.log("Ingrese Documento");
        return;
      }
      if (!madre.fNacimiento == null) {
        this.toastr.warning("Ingrese Fecha Nacimiento de la Madre", "Información");
        console.log("Ingrese fecha nacimiento Madre");
        return;
      }
      if (madre.tDireccion == "") {
        this.toastr.warning("Ingrese Dirección del Madre", "Información");
        console.log("Ingrese Direccion Madre");
        return;
      }
      if (madre.tTelefono == "") {
        this.toastr.warning("Ingrese Telefono de la madre", "Información");
        console.log("Ingrese Telefono");
        return;
      }
      if (madre.tEmail == "") {
        this.toastr.warning("Ingrese Correo de la Madre", "Información");
        console.log("Ingrese Correo del Madre");
        return;
      }


      





      //  console.log(estudiante);

      //  console.log(padre);

      //     console.log(madre);

      this._estudianteService.MatricularEstudiante(estudiante, padre, madre).subscribe((data: any) => {
        const response = { nCantExiste: data.nCantExiste };  // Asignamos el número a la propiedad nCantExiste             
        console.log(Number(response.nCantExiste));

        console.log(data);
        if (Number(response.nCantExiste) > 0) {
          this.toastr.warning("El Estudiante no se puede volver a matricular \n ya se encuentra registrado");  // Muestra un mensaje de éxito
        }
        else {
          this.toastr.success("Estudiante Matriculado Correctamente");  // Muestra un mensaje de éxito
          console.log("pasando : " + this.form.get('tNroDocumento')?.value)
          this.sharedService.setValue(this.form.get('tNroDocumento')?.value);  
          this.router.navigate(['/']);  // Navega a la página principal
        }
      });

    }
    else {
      //  console.log("errord  dd");
    }
  }





  getNiveles() {
    this._estudianteService.getNiveles().subscribe((data) => {
      this.listaNiveles = data;
      // console.log(data);
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
      //  console.log(data);
    })
  };
}
