import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'tab2-alarm-form',
  templateUrl: './alarm-form.component.html',
  styleUrls: ['./alarm-form.component.scss'],
})
export class AlarmFormComponent  implements OnInit {
  public emergencyForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.emergencyForm = this.fb.group({
      emergency: [''],
      priority: [''],
      description: [''],
    })
  }

  ngOnInit() {

  }
  onSubmit(){
    let formValue = this.emergencyForm.value
    console.log(formValue);
    
  }
  goTo(route: string){
    this.router.navigateByUrl(route);
  }
}