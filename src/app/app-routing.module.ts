import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Tab3Page } from './tab3/tab3.page';
import { ContactFormComponent } from './tab1/contact-form/contact-form.component';
import { AlarmActiveComponent } from './tab2/alarm-active/alarm-active.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path: 'inicio',
    component: Tab1Page
  },
  {
    path: 'alarma',
    component: Tab2Page
  },
  {
    path: 'alarma-activa',
    component: AlarmActiveComponent
  },
  {
    path: 'ajustes',
    component: Tab3Page
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'formulario-contacto',
    component: ContactFormComponent
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
