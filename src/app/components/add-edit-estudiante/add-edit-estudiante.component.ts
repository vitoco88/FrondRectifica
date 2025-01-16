import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
;
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl, FormsModule } from '@angular/forms';
import { Estudiante } from '../../interfaces/estudiante';
import { Distrito } from '../../interfaces/distritos';
import { EstudianteService } from '../../services/estudiante.service';
import { Grado } from '../../interfaces/grado';
import { Nivel } from '../../interfaces/nivel';
import { TipoDocumento } from '../../interfaces/tipodocumento';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { Apoderado } from '../../interfaces/apoderado';
import { Console } from 'node:console';
//import { console } from 'node:inspector';

@Component({
  selector: 'app-add-edit-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, ProgressBarComponent],
  templateUrl: './add-edit-estudiante.component.html',
  styleUrl: './add-edit-estudiante.component.css'
})
export class AddEditEstudianteComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  tCodEstudiante: string = '';
  inputvalue: string = '';


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


  loading: boolean = true;


  constructor(private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {

    this.loading = true;


    this.tCodEstudiante = aRouter.snapshot.paramMap.get('tCodEstudiante') || '';



    this.form = this.fb.group({
      tDireccion: ['', Validators.required],
      tAPaternoEstudiante: ['', Validators.required],
      tAMaternoEstudiante: ['', Validators.required],
      tNombresEstudiante: ['', Validators.required],


      tTelefono: ['', Validators.required],
      // option1: new FormControl(''),
      option1: ['', Validators.required],
      option: [''],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      //  tApellidosNombres: '',
      tNroDocumento: '',
      tEmail: ['', Validators.required],
      tSexo: '',
      fNacimiento: '',
      opRatificacion: ['', Validators.required],
      opDiscapacidad: ['', Validators.required],
      opExoRe: ['', Validators.required],
      tDiscapacidadObs: '',
      tDetSexo: '',
      opSeguro: ['', Validators.required],
      opConvive: ['', Validators.required],
      opPCargo: ['', Validators.required],
      opTieneHermano: false,
      tNroDocumentoRepre: ['', Validators.required],
      option5: [''],
      tAPaternoRepre: ['', Validators.required],
      tAMaternoRepre: ['', Validators.required],
      tNombresRepre: ['', Validators.required],
      tDireccionRepre: ['', Validators.required],
      tTelefonoRepre: ['', Validators.required],
      tEmailRepre: ['', Validators.required],
      opParentesco: [''],
      opParentescoRepre: ['', Validators.required],
      nCantHermanos: ''

    })


    this.tCodEstudiante = aRouter.snapshot.paramMap.get('tCodEstudiante') || '';


  }
  ngAfterViewInit(): void {
    //  throw new Error('Method not implemented.');
  }

  selectedValue1: string = '01'; // Valor inicial seleccionado

  ngOnInit(): void {

    // Acceder al estado de la navegación (sin parámetros en la URL)
    const state = history.state;  // Obtiene el 'state' de la navegación
    if (state && state.tCodEstudiante) {
      this.tCodEstudiante = state.tCodEstudiante;
    }
    this.getDistritos();
    this.getTipoDocumentos();
    this.getNiveles();
    this.getGrados();

    this.getEstudiante(this.tCodEstudiante);

  

  }

  myVariable: boolean = false;  // Variable que se actualiza con el valor de getValor()

  // Método para verificar el valor seleccionado y actualizar myVariable
  verificarValor() {
    const valor = this.form.get('opExoRe')?.value;
    this.myVariable = (valor === 'NO');
  }
  verificarValorRatificacion() {
    const valor = this.form.get('opRatificacion')?.value;
    this.myVariable = (valor === 'NO');
  }

  verificarValorDiscapacidad() {
    const valor = this.form.get('opDiscapacidad')?.value;
    this.myVariable = (valor === 'NO');
  }

  getValorDisca(valor: boolean) {
    // Actualiza la variable myVariable con el valor recibido
    this.myVariable = valor;

    // Actualiza el valor del FormControl 'respuesta' en el formulario reactivo
    this.form.get('opDiscapacidad')?.setValue(valor ? 'SI' : 'NO');
  }


  getValorRatificacion(valor: boolean) {
    // Actualiza la variable myVariable con el valor recibido
    this.myVariable = valor;

    // Actualiza el valor del FormControl 'respuesta' en el formulario reactivo
    this.form.get('opRatificacion')?.setValue(valor ? 'SI' : 'NO');
  }


  // Método que recibe un valor booleano y actualiza el select
  getValorExoReligion(valor: boolean) {
    // Actualiza la variable myVariable con el valor recibido
    this.myVariable = valor;

    // Actualiza el valor del FormControl 'respuesta' en el formulario reactivo
    this.form.get('opExoRe')?.setValue(valor ? 'SI' : 'NO');
  }




  // Método para manejar el envío del formulario (opcional)
  onSubmit() {
    // console.log(this.miFormulario.value);
  }

  distritos: any[] = [];  // Para vincular el valor seleccionado


  addProduct() {
    const estudiante: Estudiante = {
      tTelefono: this.form.value.tTelefono
    }

    /*  console.log(this.);
        this.loading = true;
        product.id = this.id;
        this._productService.updateProduct(this.id, product).subscribe(() => {
          this.loading = false;
          this.toastr.success("El producto fue modificado con existo", "producto actualizado")
          this.router.navigate(['/']);
        })
      
   */
  }
  lRatificaciont: boolean = false;
  lDiscapacidadt: boolean = false;
  lExoneradot: boolean = false;

  lHermanos: boolean = false;

  PasarDatosPadre() {


    this._estudianteService.getPadre(this.tCodEstudiante).subscribe((data: Apoderado) => {
    //  console.log("Response completo:", JSON.stringify(data, null, 2));


    if(!data)
    {
      this.toastr.info("No se encontro datos del padre", "Información");
    }
    else{    
      this.form.patchValue({
        tDireccionRepre: data.tDireccion,
        tNroDocumentoRepre: data.tNroDocumento,
        tAPaternoRepre: data.tAPaterno,
        tAMaternoRepre: data.tAMaterno,
        tNombresRepre: data.tNombres,
        tTipoDocumentoRepre: data.tCodTipoDocumento,
        tTelefonoRepre: data.tTelefono,
        tEmailRepre: data.tEmail,
        //  selectedParentesco: data.tCodParentesco,
      });
      if (data.tCodParentesco) {
        this.selectedParentesco = data.tCodParentesco;
        this.form.get('opParentescoRepre')?.setValue(this.selectedParentesco);
      }
      if (data.tCodTipoDocumento) {
        this.selectedTipoDocRepre = data.tCodTipoDocumento;
        this.form.get('option5')?.setValue(this.selectedTipoDocRepre);
      }
    }

    });
  }


  PasarDatosMadre() {

    this._estudianteService.getMadre(this.tCodEstudiante).subscribe((data: Apoderado) => {
   //   console.log("Response completo:", JSON.stringify(data, null, 2));

   if(data)
   {
      this.form.patchValue({
        tDireccionRepre: data.tDireccion,
        tNroDocumentoRepre: data.tNroDocumento,
        tAPaternoRepre: data.tAPaterno,
        tAMaternoRepre: data.tAMaterno,
        tNombresRepre: data.tNombres,
        tTipoDocumentoRepre: data.tCodTipoDocumento,
        tTelefonoRepre: data.tTelefono,
        tEmailRepre: data.tEmail,
        //  selectedParentesco: data.tCodParentesco,
      });
      if (data.tCodParentesco) {
        this.selectedParentesco = data.tCodParentesco;
        this.form.get('opParentescoRepre')?.setValue(this.selectedParentesco);
      }
      if (data.tCodTipoDocumento) {
        this.selectedTipoDocRepre = data.tCodTipoDocumento;
        this.form.get('option5')?.setValue(this.selectedTipoDocRepre);
      }
    }
    else{
      this.toastr.info("No se encontro datos de la madre", "Información");
    }

    });
  }




  RegistrarEstudiante() {
    // console.log(this.form.get('opExoRe')?.value);

    const confirmar = window.confirm('¿Estás seguro de que deseas enviar los datos?');
    if (confirmar) {
      /*      if (this.tEstadoRegistro == "02" || this.tEstadoRegistro == "03") {
              this.toastr.info("No se puede modificar comuniquese con la institución");
              //   this.router.navigate(['/']);
            }
        */
      /*   else {  
      
    */
      this.lRatificaciont = false;
      this.lDiscapacidadt = false;
      this.lExoneradot = false;
      if (this.form.get('opExoRe')?.value == 'SI') {
        this.lExoneradot = true;
      }
      if (this.form.get('opDiscapacidad')?.value == 'SI') {
        this.lDiscapacidadt = true;
      }
      if (this.form.get('opRatificacion')?.value == 'SI') {
        this.lRatificaciont = true;
      }
      //   if (this.form.get('opTieneHermano')?.value == 'SI') {
      //      this.lHermanos = true;
      //  }

      const selectSeguro = document.getElementById("opSeguro") as HTMLSelectElement;
      //  const selectSexo = document.getElementById("opSexo") as HTMLSelectElement;
      const selectVive = document.getElementById("opConvive") as HTMLSelectElement;
      const selectApoderado = document.getElementById("opPCargo") as HTMLSelectElement;
      const selectTipoCodigoEst = document.getElementById("option1") as HTMLSelectElement;
      //  console.log("enviando " + selectTipoCodigoEst.value)
      const selectTipoDocRepre = document.getElementById("option5") as HTMLSelectElement;
      //  const selectTipoDocRdepre = document.getElementById("opTieneHermano") as HTMLSelectElement;
      //  console.log("enviando " + selectTipoCodigoEst);
      const estudiante: Estudiante = {
        tDireccion: this.form.value.tDireccion,
        tTelefono: this.form.value.tTelefono,
        tEmail: this.form.value.tEmail,
        fNacimiento: this.form.value.fNacimiento,
        tCodDistrito: this.form.get('option')?.value,
        tCodTipoDocumento: selectTipoCodigoEst.value,
        tTipoDocumentoRepre: selectTipoDocRepre.value,
        tAPaternoRepre: this.form.value.tAPaternoRepre,
        tAMaternoRepre: this.form.value.tAMaternoRepre,
        tNombresRepre: this.form.value.tNombresRepre,
        tNroDocumentoRepre: this.form.value.tNroDocumentoRepre,
        tDireccionRepre: this.form.value.tDireccionRepre,
        tEmailRepre: this.form.value.tEmailRepre,
        tTelefonoRepre: this.form.value.tTelefonoRepre,
        tParentescoRepre: this.selectedParentesco,
        tCodParentescoRepre: this.selectedParentesco,
        tAMaterno: this.form.value.tAMaternoEstudiante,
        tAPaterno: this.form.value.tAPaternoEstudiante,
        tNombres: this.form.value.tNombresEstudiante,
        tCodSeguro: selectSeguro.value,
        tVive: selectVive.value,
        tApoderado: selectApoderado.value,
        //   const selectSeguro = document.getElementById("opSeguro") as HTMLSelectElement;
        //  const selectSexo = document.getElementById("opSexo") as HTMLSelectElement;
        //     const selectVive = document.getElementById("opConvive") as HTMLSelectElement;
        //   const selectApoderado = document.getElementById("opPCargo") as HTMLSelectElement;
        lHermanos: this.selectedHermanos,
        lExonaradoR: this.lExoneradot,
        lDiscapacidad: this.lDiscapacidadt,
        tDiscapacidadObs: this.form.get('tDiscapacidadObs')?.value,
        lRatificacion: this.lRatificaciont,
        tCodGrado: this.form.get('option3')?.value,
        tNivel: this.form.get('option2')?.value,
        //   nCantHermanos : this.form.get('nCantHermanos')?.value,
        tEstadoRegistro: '02' // ratificado
        // tCodEstudiante: this.tCodEstudiante
      }
      //      console.log("tiene hermanos :" + this.selectedHermanos);
      if (this.selectedHermanos == true) {
        estudiante.nCantHermanos = this.form.get('nCantHermanos')?.value;
        //  console.log("son :" +estudiante.nCantHermanos);
        if (this.form.get('nCantHermanos')?.value == "") {
          estudiante.nCantHermanos = 0;
          //  console.log("son por dejar vacio :" +estudiante.nCantHermanos);
        }
      }
      else {
      //  console.log("marco no :" + this.selectedHermanos);
        estudiante.nCantHermanos = 0;
      }
      estudiante.tCodEstudiante = this.tCodEstudiante;
      //   console.log(estudiante);
     // console.log(estudiante);
 
     this._estudianteService.UpdateEstudiante(this.tCodEstudiante, estudiante).subscribe(() => {
        this.toastr.success("Registrado Correctamente");
        this.router.navigate(['/']);
      })
 

      console.log(estudiante.fNacimiento);
 
 
      //   }
    } else {
      // Si el usuario cancela, no hacer nada
      console.log('Operación cancelada');
    }
  }

  operation: boolean = false;
  // Método para manejar el cambio de selección
  onSelectionChange(event: any): void {
    const valorSeleccionado = event.target.value === 'true'; // Asegurarse de que sea booleano
    //  console.log(valorSeleccionado);
    if (valorSeleccionado == false) {
      this.form.get('tNroHermanos')?.setValue('');
    }
    else {
      this.form.get('tNroHermanos')?.setValue('');
    }
    this.operation = valorSeleccionado
    //console.log('Valor de miVariable:', this.miVariable); // Solo se asigna true si selecciona "SI"
  }

  isReadonly = false;
  tEstadoRegistro?: string = '';
  selectedSeguro?: string;
  selectedParentesco?: string;
  selectedApoderado?: string;
  selectedHermanos?: boolean;
  selectedTipoDocRepre?: string;

  onInputChange(event: any): void {
    /*
    const currentValue = event.target.value;
    // Si la entrada no cumple con la expresión regular, la corregimos
    if (!this.regex.test(currentValue)) {
      event.target.value = currentValue.replace(/[^a-zA-Z0-9]/g, ''); // Elimina caracteres no permitidos
    }
    */
    let currentValue = event.target.value;
    if (/^[a-zA-Z0-9]/.test(currentValue)) {
      // Reemplaza caracteres no permitidos, pero permite letras, números y espacios
      event.target.value = currentValue.replace(/[^a-zA-Z0-9 ]/g, '');
    } else {
      // Si el primer carácter no es válido, puedes limpiar el valor o manejarlo de otra manera
      event.target.value = '';
    }
  }


  getEstudiante(id: string) {
    this._estudianteService.getEstudiante(id).subscribe((data: Estudiante) => {
      //   console.log("recibido " + data);
      // console.log(data);
    //  console.log("Response completo:", JSON.stringify(data, null, 2));

    if(data)
    {
      this.loading = false;
    }
    else{
console.log("No se encontro nada");
    }
      if (data.lHermanos) {
        this.operation = true;

        if (data.nCantHermanos != null) {
          this.form.patchValue({
            nCantHermanos: data.nCantHermanos
          });
        }
        else {
          this.form.patchValue({
            nCantHermanos: '0'
          });
        }
      }
      this.form.patchValue({
        tAPaternoEstudiante: data.tAPaterno,
        tAMaternoEstudiante: data.tAMaterno,
        tNombresEstudiante: data.tNombres,
        tTelefono: data.tTelefono,
        tNroDocumento: data.tNroDocumento,
        fNacimiento: data.fNacimiento,
        tEmail: data.tEmail,
        option1: data.tCodTipoDocumento,
        option2: data.tNivel,
        option3: data.tCodGrado,
        tDetSexo: data.tDetSexo,
        tDireccion: data.tDireccion,
        tDiscapacidadObs: data.tDiscapacidadObs,
        tDireccionRepre: data.tDireccionRepre,
        tNroDocumentoRepre: data.tNroDocumentoRepre,
        tAPaternoRepre: data.tAPaternoRepre,
        tAMaternoRepre: data.tAMaternoRepre,
        tNombresRepre: data.tNombresRepre,
        tTelefonoRepre: data.tTelefonoRepre,
        tEmailRepre: data.tEmailRepre,
        //  selectedParentesco: data.tCodParentescoRepre,
        opTieneHermano: data.lHermanos
      });     
 //     console.log("tipo documento : "+ data.tTipoDocumentoRepre)
      if (data.tTipoDocumentoRepre) {
        this.form.patchValue({
          tTipoDocumentoRepre: data.tTipoDocumentoRepre,
        });
        this.form.get('option5')?.setValue(this.selectedTipoDocRepre);
        this.selectedTipoDocRepre = data.tTipoDocumentoRepre;
      }
      else
      {
   //     console.log("tipo entro documento : "+ data.tTipoDocumentoRepre)
        this.form.get('option5')?.setValue('');
        this.selectedTipoDocRepre = '';
      }
      if (data.tCodParentescoRepre) {
        this.selectedParentesco = data.tCodParentescoRepre;
        //   console.log("ddd "+ this.selectedParentesco);
        //    console.log(data.tCodParentescoRepre);
        this.form.get('opParentescoRepre')?.setValue(this.selectedParentesco);
      }
      else{       
        this.form.get('opParentescoRepre')?.setValue('');
      }

      if (data.tCodDistrito !== null) {
        this.form.get('option')?.setValue(data.tCodDistrito);
      }
      // console.log(data.lExonaradoR);
      this.getValorExoReligion(data.lExonaradoR ?? false);
      this.getValorDisca(data.lDiscapacidad ?? false);
      this.getValorRatificacion(data.lRatificacion ?? false);
      //    this.getValorSeguro(data.tCodSeguro);
      // Asumiendo que 'data.tCodSeguro' contiene el valor que quieres seleccionar

   //   console.log(data.tVive);
      this.form.get('opSeguro')?.setValue(data.tCodSeguro);
      //     this.form.get('opConVive')?.setValue(data.tVive);
      //this.form.get('opPCargo')?.setValue(data.tApoderado);
      this.selectedSeguro = data.tVive;
      //   console.log(data.tApoderado);
      this.selectedApoderado = data.tApoderado;
      //
      //     console.log(data.lHermanos);
      this.selectedHermanos = data.lHermanos;
      this.tEstadoRegistro = data.tEstadoRegistro;
      //      console.log("hola " + data.tEstadoRegistro);
      if (data.tEstadoRegistro == "03" || data.tEstadoRegistro == "02") {
        /*
                this.isReadonly = true;       
                this.form.get('opExoRe')?.disable();               
                this.form.get('opRatificacion')?.disable();        
                this.form.get('opDiscapacidad')?.disable();        
                this.form.get('option')?.disable();
                this.form.get('option1')?.disable();
                this.form.get('option2')?.disable();
                this.form.get('option3')?.disable();                
                this.form.get('opSeguro')?.disable();
                this.form.get('opConvive')?.disable();
                this.form.get('opPCargo')?.disable();
                this.form.get('opTieneHermano')?.disable();
            */
        //      console.log("hola " + data.tEstadoRegistro);
      }
    });

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
      //   console.log(data);
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
