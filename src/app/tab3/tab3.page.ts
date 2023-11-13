import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeocodingService } from '../services/geocoding/geocoding.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private router: Router,
  ) {

  }
  goTo(route: string){
      this.router.navigateByUrl(route);
  }
  
}
