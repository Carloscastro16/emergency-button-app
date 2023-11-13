import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  public URL_API = environment.URL_API
  constructor(
    private http: HttpClient
  ) { 

  }
  async SubmitContact(value: any){
    try {
      let users = await this.http.post<any>(this.URL_API + '/contact/create-contact', value).toPromise();
      return users?.data;
    } catch (error) {
      throw error;
    }
  }
}
