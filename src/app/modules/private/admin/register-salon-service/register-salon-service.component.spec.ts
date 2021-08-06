import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSalonServiceComponent } from './register-salon-service.component';

describe('RegisterSalonServicoComponent', () => {
  let component: RegisterSalonServiceComponent;
  let fixture: ComponentFixture<RegisterSalonServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSalonServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSalonServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
