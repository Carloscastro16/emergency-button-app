import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ContactosService } from '../services/contactos/contactos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public userData: any;
  public contacts: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private contactsService: ContactosService
  ) {}
  async ngOnInit() {
    this.userData = await this.onGetUser();
    this.userData = {
      name: this.userData.displayName,
      uid: this.userData.uid,
      email: this.userData.email
    }
    this.contacts = await this.contactsService.getContacts();
  }
  goTo(route: string){
    this.router.navigateByUrl(route);
  }
  async onGetUser(){
    let response = await this.authService.isAuthenticated();
    let data = response.user
    let userData = data
    console.log('Datos del usuario: ',userData);
    return userData
  }
}
