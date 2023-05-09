import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private fb: FormBuilder) {

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
  }
  submit() {
    console.log(this.regeisterForm.value, "form vlzue");

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
}
