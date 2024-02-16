import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseFunctionsComponent } from './test-case-functions.component';

describe('TestCaseFunctionsComponent', () => {
  let component: TestCaseFunctionsComponent;
  let fixture: ComponentFixture<TestCaseFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCaseFunctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaseFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
