import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';
import { AddEditEstudianteComponent } from './components/add-edit-estudiante/add-edit-estudiante.component';

export const routes: Routes = [

{path: '', component: ListEstudiantesComponent},
{path: 'Edit/:tCodEstudiante', component: AddEditEstudianteComponent},
{path: '*', redirectTo: '', pathMatch: 'full'}
];


export class AppRoutingModule { }
 