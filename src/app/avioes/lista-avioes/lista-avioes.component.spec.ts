import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAvioesComponent } from './lista-avioes.component';

describe('ListaAvioesComponent', () => {
  let component: ListaAvioesComponent;
  let fixture: ComponentFixture<ListaAvioesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAvioesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAvioesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
