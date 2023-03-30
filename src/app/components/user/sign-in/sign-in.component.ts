import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    ripetiPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    accetto: new FormControl('',Validators.requiredTrue),
  })

  onSubmit(){
    console.log(this.form.value);
  }

}
