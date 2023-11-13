import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


interface Authenticated {
  res?: boolean;
  user?: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public URL_API: string = environment.URL_API
  constructor(
    private http: HttpClient,
    private firebase: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private authFire: Auth
  ) { }
  async isAuthenticated(): Promise<Authenticated> {
    const user: any = await this.isLoggedIn();
    if (user) {
      // console.log("logged in");
      
      return { res: true, user: user };
    } else {
      return { res: false };
    }
  }

  async getUser(uid: string){
    try {
      const user = await this.firebase.collection('admins').doc(uid).get().toPromise();
      return user?.data()
    } catch (error) {
      console.log(error);
      throw error
    }
  }

  async isLoggedIn() {
    return await this.auth.authState.pipe(first()).toPromise();
  }

  async login(email: string, password: string) {
    try {
      console.log('Iniciando sesión')
      const sigInSnapshot = await this.auth.signInWithEmailAndPassword( email, password );
      if (!sigInSnapshot.user) {
        throw false;
      }
      return this.router.navigate(['login']);
    } catch (error: any) {
      console.log(error);
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta creada con el correo ingresado"
          break;
        case "auth/invalid-login-credentials":
          errorMessage = "Los datos ingresados no son validos"
          break;
        case "auth/invalid-email":
          errorMessage = "Correo electrónico incorrecto"
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta"
          break;
        case "auth/invalid-password":
          errorMessage = "Contraseña inválida"
          break;
        default:
          break;
      }

      if (error.code == undefined) {
        errorMessage = "No existe una cuenta con el correo ingresado."
      }
      Swal.fire({
        title: errorMessage,
        icon: 'warning',
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#06D68F',
      })
      throw { error: true, message: errorMessage };
    }
  }

  async logout(): Promise<any> {
    try {
      return await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  async register(body: any){
    try {
      console.log('Registrando usuario')
      let response = await this.http.post<any>(this.URL_API + '/user/createUser', body).toPromise();
      return response;
    } catch (error: any) {
      console.log(error);
      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No existe una cuenta creada con el correo ingresado"
          break;
        case "auth/invalid-login-credentials":
          errorMessage = "Los datos ingresados no son validos"
          break;
        case "auth/invalid-email":
          errorMessage = "Correo electrónico incorrecto"
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta"
          break;
        case "auth/invalid-password":
          errorMessage = "Contraseña inválida"
          break;
        default:
          break;
      }

      if (error.code == undefined) {
        errorMessage = "No existe una cuenta con el correo ingresado."
      }
      Swal.fire({
        title: errorMessage,
        icon: 'warning',
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#06D68F',
      })
      throw { error: true, message: errorMessage };
    }
  }
}
