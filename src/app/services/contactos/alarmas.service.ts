import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  public URL_API = environment.URL_API
  constructor(
    private http: HttpClient
  ) { }

  async submitAlarm(value: any){
    try {
      let users = await this.http.post<any>(this.URL_API + '/emergency/create-emergency', value).toPromise();
      return users?.data;
    } catch (error) {
      throw error;
    }
  }
}
