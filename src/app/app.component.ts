import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';
import { FormsModule } from '@angular/forms';
import { AddEditApoderadosComponent } from "./components/add-edit-apoderados/add-edit-apoderados.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 // imports: [NavbarComponent, ListEstudiantesComponent]
})
export class AppComponent {
  title = 'FrondRectificacion';


  static ValorBusqueda: string = ''


}
