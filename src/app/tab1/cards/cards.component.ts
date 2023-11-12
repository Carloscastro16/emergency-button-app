import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab1-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent  implements OnInit {
  cardInfo: any = {
    name: 'Carlos Castro',
    tag: 'Padre',
    phone: '9983822890'
  }
  constructor() { }

  ngOnInit() {}

}
