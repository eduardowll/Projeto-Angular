import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarAviaoComponent } from './atualizar-aviao.component';

describe('AtualizarAviaoComponent', () => {
  let component: AtualizarAviaoComponent;
  let fixture: ComponentFixture<AtualizarAviaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarAviaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarAviaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
