import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly GEOCODING_API = 'https://maps.googleapis.com/maps/api/geocode/json';
  private readonly API_KEY = 'AIzaSyDWenwdFN8ZLatbMwvCnFeo422bYfegoFg'; // Reemplaza esto con tu clave API de Google Maps

  constructor(private http: HttpClient) { }

  getDirection(lat: number, lng: number): Observable<any> {
    const url = `${this.GEOCODING_API}?latlng=${lat},${lng}&key=${this.API_KEY}`;
    let response = this.http.get(url);
    return response
    
  }
}
