import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaEstudiantesComponent } from './matricula-estudiantes.component';

describe('MatriculaEstudiantesComponent', () => {
  let component: MatriculaEstudiantesComponent;
  let fixture: ComponentFixture<MatriculaEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculaEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
