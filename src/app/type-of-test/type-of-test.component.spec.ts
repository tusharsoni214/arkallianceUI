import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfTestComponent } from './type-of-test.component';

describe('TypeOfTestComponent', () => {
  let component: TypeOfTestComponent;
  let fixture: ComponentFixture<TypeOfTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeOfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
