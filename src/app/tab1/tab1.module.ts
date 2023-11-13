import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { ContactFormComponent } from './contact-form/contact-form.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    Tab1Page,
    CardsComponent,
    ContactFormComponent
  ]
})
export class Tab1PageModule {}
