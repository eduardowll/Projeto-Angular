import { Routes } from '@angular/router';
import { ListaAvioesComponent } from './avioes/lista-avioes/lista-avioes.component';
import { CadastroAvioesComponent } from './avioes/cadastro-avioes/cadastro-avioes.component';
import { AtualizarAviaoComponent } from './avioes/atualizar-aviao/atualizar-aviao.component';

export const routes: Routes = [
    { path: 'avioes', component: ListaAvioesComponent },
    { path: 'cadastro-aviao', component: CadastroAvioesComponent },
    { path: 'atualizar-aviao/:id', component: AtualizarAviaoComponent }
  ];
