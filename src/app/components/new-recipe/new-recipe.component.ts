import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
  providers: [MessageService]
})
export class NewRecipeComponent {

  title: string;
  description: string;
  image: string;
  published: boolean;
  difficulty: number;

  constructor(
    private recipeService: RecipeService,
    private modal: NgbModal,
    private router: Router,
    private messageService: MessageService
  ) {  }

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    published: new FormControl('', Validators.required),
    difficulty: new FormControl('1', [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  Editor = ClassicEditorBuild;

    editorConfig = {
      toolbar: {
          items: [
              'bold',
              'italic',
              'link',
              'bulletedList',
              'numberedList',
              '|',
              'indent',
              'outdent',
              '|',
              'codeBlock',
              'imageUpload',
              'blockQuote',
              'insertTable',
              'undo',
              'redo',
          ]
      },
      image: {
          toolbar: [
              'imageStyle:full',
              'imageStyle:side',
              '|',
              'imageTextAlternative'
          ]
      },
      table: {
          contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells'
          ]
      },
      height: 300,
  };


  ngOnInit(): void {
    this.prendiDatiRicetta();
  }

  // onSubmit() {
  //   this.recipeService.datiRicetta.next(recipe);
  //   this.router.navigate(['new-recipe']);
  // }

  aggiungiRicette(): void {
    const recipe = {
      title: this.form.value.title,
      description: this.form.value.description,
      image: this.form.value.image,
      difficulty: this.form.value.difficulty,
      published: this.form.value.published,
    }
    this.recipeService.insertRecipe(recipe).subscribe(res => {
      console.log('response is ', res)
                if(res){
            this.messageService.add({severity: 'success', summary: '', detail: 'Ricetta aggiunta con successo', life: 3000})

      }
    })
    this.recipeService.datiRicetta.next(recipe);

  }

  prendiDatiRicetta() {
    this.recipeService.datiRicetta.subscribe((res: any) => {
      this.title = res.title;
      this.description = res.description;
      this.image = res.image;
      this.published = res.published;
      this.difficulty = res.difficulty;

    })
  }

  closeModal() {
    this.title = '';
    this.description = '';
    this.image = '';
    this.published = false;
    this.difficulty = null;

  }

  open(content: any, titolo?: string) {
    let title = titolo;
    this.modal.open(content, { ariaLabelledBy: 'modale servizi', size: 'lg', centered: true}).result.then((res) => {
      this.svuotaCampi();
      this.router.navigate(['new-recipe']);
    }).catch((res) => {
      this.router.navigate(['ricette']);
    });
  }

  svuotaCampi(){
    this.recipeService.datiRicetta.subscribe((res: any) => {
      res.title = '';
      res.description = '';
      res.image = '';
      res.published = false;
      res.difficulty = null;
    })
  }
}
