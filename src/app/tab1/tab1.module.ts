import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CardsComponent } from './cards/cards.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    Tab1Page,
    CardsComponent
  ]
})
export class Tab1PageModule {}
