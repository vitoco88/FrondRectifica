import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApoderadosComponent } from './list-apoderados.component';

describe('ListApoderadosComponent', () => {
  let component: ListApoderadosComponent;
  let fixture: ComponentFixture<ListApoderadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListApoderadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListApoderadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
