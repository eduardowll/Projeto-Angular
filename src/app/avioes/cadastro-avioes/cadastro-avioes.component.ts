import { Component } from '@angular/core';
import { Aviao } from '../model/aviao';
import { AvioesService } from '../service/avioes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-cadastro-avioes',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './cadastro-avioes.component.html',
  styleUrl: './cadastro-avioes.component.css'
})
export class CadastroAvioesComponent {
  avioes_array: Aviao[] = [];
  form: FormGroup;
  exibirForm: boolean = false;

  constructor(
      private avioesService: AvioesService,
      private fb: FormBuilder,
      public snackBar: MatSnackBar,
      private router: Router
    ) {
      this.form = this.fb.group({
        modelo: [''],
        velomaxima: [''],
        numpassageiros: [null],
        categoria: [''],
        preco: ['']
      });
    }  

  createAviao(){
    if (this.form.valid) {
      const novoAviao = { ...this.form.value };
      this.avioesService.create(novoAviao).subscribe({
        next: () => {
          this.snackBar.open('Avião criado com sucesso!', 'Fechar', { duration: 2000 });
          this.form.reset();
          this.exibirForm = false;
        },
        error: () => {
          this.snackBar.open('Erro ao criar avião.', 'Fechar', { duration: 2000 });
        },
      });
    } else {
      this.snackBar.open('Por favor, preencha todos os campos.', 'Fechar', { duration: 2000 });
    }
  }
  cancelarForm() {
    this.form.reset(); 
    this.exibirForm = false; 
  }
}
