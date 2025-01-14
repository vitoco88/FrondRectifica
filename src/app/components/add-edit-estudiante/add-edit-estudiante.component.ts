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

@Component({
  selector: 'app-add-edit-estudiante',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-estudiante.component.html',
  styleUrl: './add-edit-estudiante.component.css'  
})
export class AddEditEstudianteComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  tCodEstudiante: string  ='';
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




  constructor(private fb: FormBuilder,
    private _estudianteService: EstudianteService,
    private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      tDireccion: ['', Validators.required],
      tTelefono: ['', Validators.required],
      // option1: new FormControl(''),
      option1: [''],
      option: [''],
      option2:  [''],
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

    })


    this.tCodEstudiante = aRouter.snapshot.paramMap.get('tCodEstudiante') || '';


  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }



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

  RegistrarEstudiante() {
    // console.log(this.form.get('opExoRe')?.value);

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




    const estudiante: Estudiante = {
      tDireccion: this.form.value.tDireccion,
      tTelefono: this.form.value.tTelefono,
      tEmail: this.form.value.tEmail,

      tCodDistrito: this.form.get('option')?.value,
      lExonaradoR: this.lExoneradot,
      lDiscapacidad: this.lDiscapacidadt,
      tDiscapacidadObs: this.form.get('tDiscapacidadObs')?.value,
      lRatificacion: this.lRatificaciont,
      tCodGrado: this.form.get('option3')?.value,
      tNivel: this.form.get('option2')?.value,
      tEstadoRegistro: '02'
      // tCodEstudiante: this.tCodEstudiante
    }

    /*
    
        console.log(this.tCodEstudiante);
        console.log(estudiante.tDireccion);
        console.log(estudiante.tTelefono);
        console.log(estudiante.tEmail);
        console.log(estudiante.tCodDistrito);
        console.log(estudiante.lExonaradoR);
        console.log(estudiante.lDiscapacidad);
        console.log(estudiante.lRatificacion);
        console.log(estudiante.tCodGrado);
        console.log(estudiante.tNivel);
    */

    estudiante.tCodEstudiante = this.tCodEstudiante;
    this._estudianteService.UpdateEstudiante(this.tCodEstudiante, estudiante).subscribe(() => {
      this.toastr.success("Registrado Correctamente");
      this.router.navigate(['/']);
    })

  }

  getEstudiante(id: string) {
    this._estudianteService.getEstudiante(id).subscribe((data: Estudiante) => {
     // console.log(data);

      this.form.patchValue({
        tTelefono: data.tTelefono,
        tApellidosNombres: data.tApellidosNombres,
        tNroDocumento: data.tNroDocumento,
        fNacimiento: data.fNacimiento,
        tEmail: data.tEmail,
        option1: data.tCodTipoDocumento,
        option2: data.tNivel,
        option3: data.tCodGrado,
        tDetSexo: data.tDetSexo,
        tDireccion: data.tDireccion,
        tDiscapacidadObs: data.tDiscapacidadObs,
        option: data.tCodDistrito


      });
      // console.log(data.lExonaradoR);
      this.getValorExoReligion(data.lExonaradoR ?? false);
      this.getValorDisca(data.lDiscapacidad ?? false);
      this.getValorRatificacion(data.lRatificacion ?? false);
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
