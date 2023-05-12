import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../model/user.model';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ["Monthly", 'Quarterly', "Year"]
  public importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and endurance",
    "Building lean Muscle",
    "Fitness",
  ]
  public regeisterForm!: FormGroup
  public userIdUpdate! :number
  public isUpdateActive:boolean =false;


  constructor(private fb: FormBuilder,
    private api:ApiService,
    private activatedRoute:ActivatedRoute,
    private toastService:NgToastService,
    private router:Router
    ) {

  }
  ngOnInit(): void {
    this.regeisterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobail: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiresult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGYMBefore: [''],
      enquiryDate: [''],

    })
    this.regeisterForm.controls['height'].valueChanges.subscribe(res=>{
      this.claculateBmi(res)
    })
    this.activatedRoute.params.subscribe(val=>{
this.userIdUpdate =val['id'];
this.api.getRegisteredUserId(this.userIdUpdate).subscribe(res=>{
  this.isUpdateActive =true;
  this.filFormToUpdate(res)
})
    })
    }
  submit() {
   this.api.postRegisteredUser(this.regeisterForm.value).subscribe(res=>{
   this.toastService.success({detail:'Success',summary:'user addes',duration:3000});
   this.regeisterForm.reset();

   })

  }
  update(){
    this.api.updateRegisteredUser(this.regeisterForm.value, this.userIdUpdate).subscribe(res=>{
      this.toastService.success({detail:'Success',summary:'User Update',duration:3000});
      this.regeisterForm.reset();
      this.router.navigate(['list'])
   
      })
     
  }

  claculateBmi(heightValue: number): void {
    const weight = this.regeisterForm.value.height
    const height = heightValue;
    const bmi = weight / (height * height);
    this.regeisterForm.controls['bmi'].patchValue(bmi)
    switch (true) {
      case bmi < 18.5:
        this.regeisterForm.controls['bmiresult'].patchValue('Under weight ')
        break
      case (bmi >= 18.5 && bmi < 25):
        this.regeisterForm.controls['bmiresult'].patchValue('Normal ')
        break
      case (bmi >= 25 && bmi < 30):
        this.regeisterForm.controls['bmiresult'].patchValue('Over weight ')
        break

      default:
        this.regeisterForm.controls['bmiresult'].patchValue('Obese')
        break;

    }

  }
  filFormToUpdate(user:user){
this.regeisterForm.setValue({
  firstName:user.firstName,
 
      lastName: user.lastName,
      email: user.email,
      mobail: user.mobail,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiresult: user.bmiresult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGYMBefore: user.haveGYMBefore,
      enquiryDate: user.enquiryDate

})
  }

}
