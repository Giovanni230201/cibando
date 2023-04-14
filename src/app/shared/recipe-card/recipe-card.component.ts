import { Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { Observable, take, map } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
  providers: [MessageService]
})
export class RecipeCardComponent implements OnInit, OnDestroy {


  @Input() pag: string;

  @Output() messaggio= new EventEmitter();

  // recipes: Recipe[];

  ricetteTotali: number;
  page=1;
  ricettePerPagina=4;
  ricette: Recipe[];
  ruolo: any;
  loading=true;

  // recipes$ = this.recipeService.getRecipes().pipe(
  // //  map(response => response.filter(ricetteFiltrate => ricetteFiltrate.difficulty < 3)),
  //   map(res => {
  //     this.ricette = res;
  //     if(res){
  //       this.messageService.add({severity:'success', summary:'', detail:'Ricetta caricata correttamente'})
  //     }
  //   }),
  // );

  ricercato: any;


  recipes$ = this.recipeService.getRecipes().pipe(
    map(response => {
      if(this.pag === 'ricerca') {
        this.recipeService.testoCercato.subscribe({
          next: (res) => {
            this.ricercato = res;
             if(this.ricercato) {
          this.recipeService.findRecipes(this.ricercato).subscribe({
            next: (res) => {
              this.ricette = res;
              console.log(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
          },
          error: (err) => {
            console.error(err);
          }
        });

      } else {
        this.ricette = response;
        if(response) {
          this.messageService.add({severity: 'success', summary:'Completato', detail: 'Ricette caricate correttamente', life: 3000})
        }
      }
    }),
  );


  //recipess$ = this.recipeService.getRecipes();



  constructor (
    private recipeService: RecipeService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
    ){}


//   ngOnInit(): void {
//      if(JSON.parse(localStorage.getItem('user')) != null) {
//       this.userService.userRole.subscribe({
//         next: (res) => {
//           this.ruolo = res;
//         },
//         error: (err) => {
//           console.log(err);
//         }
//       })
//     }
// }

ngOnInit(): void {
  if(JSON.parse(localStorage.getItem('user')) != null){
    const user=JSON.parse(localStorage.getItem('user'));
    this.onGetUser(user.email)
  }
}

ngOnDestroy(): void {
  console.log("utente uscito dal componente")
}

// prendiRicette(){
//   this.recipeService.getRecipes()
//   .pipe(
//     take(1)
//   )
//   .subscribe({
//     next: (res) => {
//     this.recipes = res;
//     if(this.pag){
//       this.recipes = this.recipes.sort((a, b) => b._id - a._id).slice(0, 4);
//     }
//     this.ricetteTotali =res.length;
//   },
//   error: (error) =>{
//     console.log(error)
//   }

// })
// }

  inviaTitolo(titolo: string){
    this.messaggio.emit(titolo);
  }

  paginate(event) {
    event.page = event.page + 1;
    this.page = event.page;
  }

 onGetUser(email): void{
  this.userService.getUser(email).pipe(take(1))
  .subscribe({
    next: res =>{
      this.ruolo=res.role;
    },
    error: err => console.log(err)
  })
 }



}
