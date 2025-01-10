import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditApoderadosComponent } from './add-edit-apoderados.component';

describe('AddEditApoderadosComponent', () => {
  let component: AddEditApoderadosComponent;
  let fixture: ComponentFixture<AddEditApoderadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditApoderadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditApoderadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
