import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { ContactFormComponent } from './tab1/contact-form/contact-form.component';
import { AlarmActiveComponent } from './tab2/alarm-active/alarm-active.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SignInGuardService } from './services/sign-in-guard.service';

const routes: Routes = [

  {
    path: 'inicio',
    component: Tab1Page,
    canActivate: [AuthGuardService]
  },
  {
    path: 'alarma',
    component: Tab2Page,
    canActivate: [AuthGuardService]
  },
  {
    path: 'alarma-activa',
    component: AlarmActiveComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ajustes',
    component: Tab3Page,
    canActivate: [AuthGuardService]
  },
  {
    path: 'registro',
    component: RegisterComponent,
    canActivate: [SignInGuardService]
  },
  {
    path: 'formulario-contacto',
    component: ContactFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SignInGuardService]
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
