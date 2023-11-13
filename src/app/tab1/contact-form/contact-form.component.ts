import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactosService } from 'src/app/services/contactos/contactos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'tab1-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent  implements OnInit {
  public contactsForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactosService,
    private router: Router,
    private location: Location
  ) { 
    this.contactsForm = formBuilder.group({
      name: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    })
  }

  ngOnInit() {

  }
  onSubmit(){
    let formValue = this.contactsForm.value
    let valid = this.contactsForm.valid
    console.log(formValue)
    console.log(valid)
    this.contactsService.SubmitContact(formValue);
    this.router.navigateByUrl('/inicio')
  }
  goBack() {
    this.location.back();
  }
}
