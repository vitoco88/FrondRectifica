import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEstudianteComponent } from './add-edit-estudiante.component';

describe('AddEditEstudianteComponent', () => {
  let component: AddEditEstudianteComponent;
  let fixture: ComponentFixture<AddEditEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
