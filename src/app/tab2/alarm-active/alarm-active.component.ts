import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab2-alarm-active',
  templateUrl: './alarm-active.component.html',
  styleUrls: ['./alarm-active.component.scss'],
})
export class AlarmActiveComponent  implements OnInit {
  isModalOpen = false;
  constructor() { }

  ngOnInit() {}
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
