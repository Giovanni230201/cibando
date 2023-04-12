import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [MessageService]
})
export class DetailComponent implements OnInit{

  percosoStelline= '../../../../assets/images/difficolta-'
  ricetta: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.onGetRecipe();
  }

  onGetRecipe(): void{
    const id = (this.activatedRoute.snapshot.paramMap.get('_id'));


    this.recipeService.getRecipe(id).subscribe({
      next: (res) => {
        this.ricetta = res;
        this.messageService.add({severity: 'succcess', summary: '', detail: 'Ecco i dati della ricetta ricercata', life: 3000})
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Errore!', detail: 'La ricetta non è stata trovata o non esiste', life: 3000})

      }
    })
  }

  onGetRecipe2(): void {
    this.activatedRoute.params.subscribe((parametriUrl) => {
      const id = parametriUrl['_id'];

      this.recipeService.getRecipe(id).subscribe({
        next: (res) => {
          this.ricetta = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }

}
