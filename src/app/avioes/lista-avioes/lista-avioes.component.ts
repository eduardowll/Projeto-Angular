import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Aviao } from '../model/aviao';
import { AvioesService } from '../service/avioes.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lista-avioes',
  standalone: true,
  imports: [
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lista-avioes.component.html',
  styleUrls: ['./lista-avioes.component.css'],
})
export class ListaAvioesComponent {
  avioes_array: Aviao[] = [];
  displayedColumns = ['id', 'modelo', 'velomaxima', 'numpassageiros', 'acao'];
  form: FormGroup;
  aviaoEditandoId: string | null = null;

  constructor(
    private avioesService: AvioesService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      modelo: [''],
      velomaxima: [''],
      numpassageiros: [null],
    });

    this.loadAvioes();
  }

  // Carregar aviões
  loadAvioes() {
    this.avioesService.list().subscribe({
      next: (p) => {
        this.avioes_array = p;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar aviões.', 'Fechar', {
          duration: 2000,
        });
      },
    });
  }

  // Criar avião
  createAviao() {
    if (this.form.valid) {
      const novoAviao = { ...this.form.value };
      this.avioesService.create(novoAviao).subscribe({
        next: () => {
          this.snackBar.open('Avião criado com sucesso!', 'Fechar', { duration: 2000 });
          this.loadAvioes();
          this.form.reset();
        },
        error: () => {
          this.snackBar.open('Erro ao criar avião.', 'Fechar', { duration: 2000 });
        },
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos.', 'Fechar', { duration: 2000 });
    }
  }

  // Atualizar avião
  updateAviao() {
    if (this.form.valid && this.aviaoEditandoId) {
      const aviaoAtualizado = { ...this.form.value, id: this.aviaoEditandoId };
      this.avioesService.update(aviaoAtualizado).subscribe({
        next: () => {
          this.snackBar.open('Avião atualizado com sucesso!', 'Fechar', { duration: 2000 });
          this.loadAvioes();
          this.form.reset();
          this.aviaoEditandoId = null;
        },
        error: () => {
          this.snackBar.open('Erro ao atualizar avião.', 'Fechar', { duration: 2000 });
        },
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos.', 'Fechar', { duration: 2000 });
    }
  }

 // Prencher formulario com aviao
  editAviao(aviao: Aviao) {
    this.aviaoEditandoId = aviao.id;
    this.form.patchValue({
      modelo: aviao.modelo,
      velomaxima: aviao.velomaxima,
      numpassageiros: aviao.numpassageiros,
    });
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
