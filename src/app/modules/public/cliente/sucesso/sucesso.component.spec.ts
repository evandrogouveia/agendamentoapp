import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoComponent } from './sucesso.component';

describe('SucessoComponent', () => {
  let component: SucessoComponent;
  let fixture: ComponentFixture<SucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
