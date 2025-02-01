import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAvioesComponent } from './cadastro-avioes.component';

describe('CadastroAvioesComponent', () => {
  let component: CadastroAvioesComponent;
  let fixture: ComponentFixture<CadastroAvioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAvioesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAvioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
