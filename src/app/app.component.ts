import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from './services/geocoding/geocoding.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private geocodingService: GeocodingService
  ) {}
  ngOnInit(): void {
    this.obtenerUbicacion();
  }
  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    let response = await this.geocodingService.getDirection(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
      if (res.status === 'OK' && res.results && res.results.length > 0) {
        const direccion = res.results[0].formatted_address;
        console.log('Dirección:', direccion);
      } else {
        console.log('No se pudo obtener la dirección');
      }
    }, (err: any) => {
      console.log('Error:', err);
    });
    console.log('Current', coordinates);
    console.log('Current', response);

  }
}
