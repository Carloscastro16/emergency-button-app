import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Geolocation } from '@capacitor/geolocation';
import { GeocodingService } from '../services/geocoding/geocoding.service';
import { AlarmasService } from '../services/contactos/alarmas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  public isModalOpen = false;
  public onSubmitForm = false;
  public emergencyForm: FormGroup;
  public direction: string = '';
  public userData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private geocodingService: GeocodingService,
    private alarmService: AlarmasService,
    private authService: AuthService
  ) {
    this.emergencyForm = this.fb.group({
      emergency: [''],
      priority: [''],
      description: [''],
    })

  }
  async ngOnInit() {
    this.obtenerUbicacion();
    this.userData = await this.onGetUser();
    this.userData = {
      name: this.userData.displayName,
      uid: this.userData.uid,
      email: this.userData.email
    }
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async onGetUser(){
    let response = await this.authService.isAuthenticated();
    let data = response.user;
    let userData = data;
    return userData;
  }
  onSubmit(){
    let formValue = {
      ...this.userData,
      ...this.emergencyForm.value,
      direction: this.direction
    }
    this.alarmService.submitAlarm(formValue);
    console.log(formValue);
    this.isModalOpen = false;
    this.onSubmitForm = true;
  }
  goTo(route: string){
    this.router.navigateByUrl(route);
  }
  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    let response = await this.geocodingService.getDirection(coordinates.coords.latitude, coordinates.coords.longitude).subscribe(res => {
      if (res.status === 'OK' && res.results && res.results.length > 0) {
        const direccion = res.results[0].formatted_address;
        this.direction = direccion;
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
