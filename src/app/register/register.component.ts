import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  public loading = false;
  public signInForm: FormGroup;
  public invalid: boolean = false;
  public errorMessage = 'Mensaje de error';
  public passwordConfirmation = '';
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AuthService
  ) { 
    this.signInForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, this.matchFieldValidator('password')]],
    });
  }

  ngOnInit() {}
  async formValidation() {
    console.log('Validando formulario...')
    if (this.signInForm.controls['name'].errors) {
      this.invalid = true
    };
    if (this.signInForm.controls['lastName'].errors) {
      this.invalid = true
    };
    if (this.signInForm.controls['email'].errors) {
      this.invalid = true
    };
    if (this.signInForm.controls['password'].errors) {
      this.invalid = true
    };
    if (this.signInForm.controls['passwordConfirmation'].errors) {
      this.invalid = true
    };
    if (this.signInForm.invalid || this.invalid == true) {
      console.log('Formulario invalido...')
      return
    }
    
    console.log('Formulario valido...')
    await this.submit( this.signInForm.value )
  }
  async submit(formValue: any){
    console.log('Submit')
    if(formValue.invalid) {
      console.log('Error: faltan datos')
      formValue.markAllAsTouched();
      return;
    }
    try {
      const value = {
        name: formValue.name + ' ' + formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        organization: '',
        phone: formValue.phone,
        rol: 'Administrador',
      }
      const loginInfo = await this.authService.register(value);
      return
    } catch (e: any) {
      console.log(e)
      
      e.code == 'auth/user-not-found'
        ? (this.errorMessage =
          'El usuario no existe en la base de datos. Asegúrese que el usuario sea correcto.')
        : (this.errorMessage = 'Ocurrió un error, intente nuevamente');
      e.code == 'auth/invalid-login-credentials'
        ? (this.errorMessage =
          'El usuario no existe en la base de datos. Asegúrese que el usuario sea correcto.')
        : (this.errorMessage = 'Ocurrió un error, intente nuevamente');
      return
    }
  }

  matchFieldValidator(fieldToMatch: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.value;
      const matchingControl = control.root.get(fieldToMatch);
  
      if (matchingControl && controlValue !== matchingControl.value) {
        return { matchField: true };
      }
  
      return null;
    };
  }
  goTo(route: string){
    this.router.navigateByUrl(route);
  }
}
