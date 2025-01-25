import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Aviao } from '../model/aviao';
import { AvioesService } from '../service/avioes.service';


@Component({
  selector: 'app-lista-avioes',
  standalone: true, 
  imports: [MatTableModule],
  templateUrl: './lista-avioes.component.html',
  styleUrl: './lista-avioes.component.css'
})
export class ListaAvioesComponent {
  avioes$: Observable<Aviao[]>;
  avioes_array: Aviao[] = [];
  displayedColumns = ['id', 'modelo', 'velomaxima', 'numpassageiros']
  constructor(private avioesService: AvioesService){
    avioesService.list().subscribe(p => this.avioes_array = p)
    this.avioes$ = avioesService.list();
    console.log(avioesService)
  }
}
