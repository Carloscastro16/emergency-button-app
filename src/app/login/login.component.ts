import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { enterAnimation } from 'src/assets/styles/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [enterAnimation]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public invalid: boolean = false;
  public errorMessage = 'Mensaje de error';
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit(): void {
  }

  async submit(formValue: any){
    console.log('Submit')
    if(formValue.invalid) {
      console.log('Error: faltan datos')
      formValue.markAllAsTouched();
      return;
    }
    try {
      const loginInfo = await this.authService.login(
        formValue.email,
        formValue.password
      );
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
  async formValidation() {
    if (this.loginForm.controls['email'].errors) {
      this.invalid = true
    };
    if (this.loginForm.controls['password'].errors) {
      this.invalid = true
    };
    if (this.loginForm.invalid) {
      return
    }

    await this.submit( this.loginForm.value )
  }
}
