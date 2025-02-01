import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Aviao } from '../model/aviao';
import { AvioesService } from '../service/avioes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-avioes',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginator,
    MatCardModule,
  ],
  templateUrl: './lista-avioes.component.html',
  styleUrls: ['./lista-avioes.component.css'],
})
export class ListaAvioesComponent {
  avioes_array: Aviao[] = [];
  displayedColumns = ['id', 'modelo', 'velomaxima', 'numpassageiros', 'categoria', 'preco', 'acao'];
  form: FormGroup;
  aviaoEditandoId: string | null = null;
  exibirForm: boolean = false;

  length: number = 0;
  pageSize: number = 4;
  pageIndex: number = 0;

  constructor(
    private avioesService: AvioesService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      modelo: [''],
      velomaxima: [''],
      numpassageiros: [null],
      categoria: [''],
      preco: ['']
    });



    this.loadAvioes(); 
  }

  // Carregar aviões com paginação
  loadAvioes() {
  
    this.avioesService.list(this.pageIndex + 1, this.pageSize).subscribe({
      next: (a) => {
        console.log(a.data);
        of(a.data).subscribe(x => this.avioes_array = x);
        this.length = a.items;
        
      },
      error: () => {
        this.snackBar.open('Erro ao carregar aviões.', 'Fechar', { duration: 2000 });
      },
    });
  }

  onPageChange($event: PageEvent){
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.loadAvioes();
  }

  mostrarForm() {
    this.exibirForm = true; 
    this.aviaoEditandoId = null; 
    this.form.reset(); 
  }

  // Criar avião
  createAviao() {
    this.router.navigate(['/cadastro-aviao']);
    
  }

  // Atualizar avião
  updateAviao(aviao: Aviao) {
    this.router.navigate([`/atualizar-aviao/${aviao.id}`], {relativeTo: this.activatedRoute});
  }
  
  // Deletar avião
  deleteAviao(id: string) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este avião?');
    if (confirmDelete) {
      this.avioesService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Avião excluído com sucesso!', 'Fechar', { duration: 2000 });
          this.loadAvioes();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir o avião.', 'Fechar', { duration: 2000 });
        },
      });
    }
  }
}
