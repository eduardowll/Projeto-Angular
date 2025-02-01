import { Component } from '@angular/core';
import { Aviao } from '../model/aviao';
import { AvioesService } from '../service/avioes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-atualizar-aviao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './atualizar-aviao.component.html',
  styleUrl: './atualizar-aviao.component.css'
})
export class AtualizarAviaoComponent {
  
  avioes_array: Aviao[] = [];
  form: FormGroup;
  exibirForm: boolean = false;
  aviaoEditandoId: string | null = null;

  constructor(
    private avioesService: AvioesService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      modelo: [''],
      velomaxima: [''],
      numpassageiros: [null],
      categoria: [''],
      preco: ['']
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.aviaoEditandoId = id;
      this.editAviao(id);
    }
  }  

  atualizarAviao(){
    if (this.form.valid) {
      const aviaoAtualizado = { ...this.form.value, id: this.aviaoEditandoId };
      this.avioesService.update(aviaoAtualizado).subscribe({
        next: () => {
          this.snackBar.open('Avião atualizado com sucesso!', 'Fechar', { duration: 2000 });
          this.form.reset();
          this.exibirForm = false;
        },
        error: () => {
          this.snackBar.open('Erro ao atualizar avião.', 'Fechar', { duration: 2000 });
        },
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos.', 'Fechar', { duration: 2000 });
    }
  }

  editAviao(id: string): void {
    this.avioesService.getId(id).subscribe({
      next: (aviao) => {
        this.form.patchValue(aviao); // Preenche o formulário com os dados do avião
      },
      error: () => {
        this.snackBar.open('Erro ao carregar avião.', 'Fechar', { duration: 2000 });
      }
    });
  }


  cancelarForm() {
    this.form.reset(); 
    this.exibirForm = false; 
  }

}
