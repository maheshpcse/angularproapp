import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import Stepper from 'bs-stepper';
declare var $: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  public stepForm: FormGroup;
  public minValueCtrl: FormControl;
  public maxValueCtrl: FormControl;

  minError: any = '';
  maxError: any = '';
  disabled: boolean = true;

  username: any;
  password: any;
  
  constructor(public fb: FormBuilder) { }

  async ngOnInit() {
    this.stepForm = this.fb.group({
      meritData: this.fb.array([])
    });
    this.disabled = true;
    this.nextStep('');
    this.previousStep('');
    this.stepFormData();
  }

  
  prevForm: boolean = false;
  prevForm1: boolean = false;
  prevForm2: boolean = false;
  nextForm: boolean = true;
  nextForm1: boolean = false;
  nextForm2: boolean = false;
  saveForm: boolean = false;

  nextStep(i) {
    console.log(i);
    this.disabled = true;
    var stepper1 = new Stepper(document.querySelector('#stepper1'));
    if (i == 2) {
      stepper1.to(i);
      this.nextForm = false;
      this.nextForm1 = true;
      this.prevForm = true;
    }
    else if (i == 3) {
      stepper1.to(i);
      this.nextForm1 = false;
      this.prevForm = false;
      this.nextForm2 = true;
      this.prevForm1 = true;
    }
    else if (i == 4) {
      stepper1.to(i);
      this.nextForm2 = false;
      this.prevForm1 = false;
      this.saveForm = true;
      this.prevForm2 = true;
    }
  }

  previousStep(i) {
    var stepper1 = new Stepper(document.querySelector('#stepper1'));
    if (i == 1) {
      stepper1.to(i);
      this.nextForm = true;
      this.nextForm1 = false;
      this.prevForm = false;
    }
    else if (i == 2) {
      stepper1.to(i);
      this.nextForm2 = false;
      this.prevForm1 = false;
      this.nextForm1 = true;
      this.prevForm = true;
    }
    else if (i == 3) {
      stepper1.to(i);
      this.saveForm = false;
      this.prevForm2 = false;
      this.nextForm2 = true;
      this.prevForm1 = true;
    }
    else if (i == 4) {
      stepper1.to(i);
      this.saveForm = true;
      this.prevForm2 = true;
      this.nextForm2 = false;
      this.prevForm1 = false;
    }
  }

  stepFormData() {
    var arr = [
      { id: 1, name: 'Average', rating: 4 },
      { id: 2, name: 'Good', rating: 5 },
      { id: 3, name: 'Bad', rating: 2 },
      { id: 4, name: 'Below Average', rating: 3 },
      { id: 5, name: 'Very Bad', rating: 1 }
    ]
    arr.forEach((element: any) => {
      this.addData(element)
    });
  }

  // saveAsForm() {
  //   if((this.username != '' && this.password != '') || (this.username != null && this.password != null)) {
  //     this.disabled = false;
  //   } else {
  //     this.disabled = true;
  //   }
  // }

  async addData(value: any) {
    const control = this.stepForm.controls.meritData as FormArray;
    const Value = await this.initData(value);
    control.push(Value);
  }

  async initData(value: any) {
    this.minValueCtrl = this.fb.control('', [Validators.required, Validators.min(1), Validators.max(99)]);
    this.maxValueCtrl = this.fb.control('', [Validators.required, Validators.min(1), Validators.max(99)]);
    return this.fb.group({
      id: value.id,
      name: value.name,
      rating: value.rating,
      minValue: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      maxValue: ['', [Validators.required, Validators.min(1), Validators.max(99)]]
    });
  }

  get meritData(): FormArray {
    return <FormArray>this.stepForm.get('meritData');
  }

  rating: any = [];
  minValue: any = [];
  min: any;

  getMinPointAt(index) {
    // console.clear();
    const NUMBER_REGEXP = /[+-]?([0-9]*[.])?[0-9]+/;
    let x = (this.stepForm.get('meritData') as any).controls[index].get('minValue').invalid;
    let y = (this.stepForm.get('meritData') as any).controls[index].get('minValue').dirty;
    let z = (this.stepForm.get('meritData') as any).controls[index].get('minValue').touched;
    // console.log("min x value=====>", x);
    // console.log("min y value=====>", y);
    // console.log("min z value=====>", z);
    if (z) {
      if (index == 0) {
        if (this.minValue[index] === '' || this.minValue[index] === null || this.minValue[index] === undefined) {
          this.minError = 'minValue is required';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (!NUMBER_REGEXP.test(this.minValue[index])) {
          console.log(NUMBER_REGEXP.test(this.minValue[index]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = 'minValue is entered wrong';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.minValue[index] <= 0 || this.minValue[index] >= 100) {
          this.minError = 'minValue is should be between 0 and 100';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else {
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index]), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = '';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
      }
      else if (index == 1 || index == 2 || index == 3 || index == 4) {
        if (this.minValue[index] === '' || this.minValue[index] === null || this.minValue[index] === undefined) {
          this.minError = 'minValue iss required';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (NUMBER_REGEXP.test(this.minValue[index]) === false) {
          console.log(NUMBER_REGEXP.test(this.minValue[index]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = 'minValue is entered wrong';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.minValue[index] <= 0 || this.minValue[index] >= 100) {
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = 'minValue iss should be between 0 and 100';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.minValue[index] < this.minValue[index - 1]) {
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index] + 1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = 'minValue iss should bee greater than previous minValue';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else {
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index]), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
          this.minError = '';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
      }
      else {
        (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index]), Validators.max(99)]));
        (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
        this.minError = '';
        return (<FormArray>this.stepForm.get('meritData')).at(index);
      }
    }
    else if (x && y && z) {
      (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index]), Validators.max(99)]));
      (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
      this.minError = '';
      return (<FormArray>this.stepForm.get('meritData')).at(index);
    }
    else {
      (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.minValue[index]), Validators.max(99)]));
      (this.stepForm.get('meritData') as any).controls[index].controls['minValue'].updateValueAndValidity();
      this.minError = '';
      return (<FormArray>this.stepForm.get('meritData')).at(index);
    }
  }

  maxValue: any = [];
  max: any;

  getMaxPointAt(index) {
    // console.clear();
    const NUMBER_REGEXP = /[+-]?([0-9]*[.])?[0-9]+/;
    let x = (this.stepForm.get('meritData') as any).controls[index].get('maxValue').invalid;
    let y = (this.stepForm.get('meritData') as any).controls[index].get('maxValue').dirty;
    let z = (this.stepForm.get('meritData') as any).controls[index].get('maxValue').touched;
    // console.log("max x value=========>", x);
    // console.log("max y value=========>", y);
    // console.log("max z value=========>", z);
    if (z) {
      if (index == 0) {
        if (this.maxValue[index] === '' || this.maxValue[index] === null || this.maxValue[index] === undefined) {
          this.maxError = 'maxValue is required';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (!NUMBER_REGEXP.test(this.maxValue[index])) {
          console.log(NUMBER_REGEXP.test(this.maxValue[index]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue is entered wrong';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.maxValue[index] <= 0 || this.maxValue[index] >= 100) {
          this.maxError = 'maxValue is should be between 0 and 100';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.maxValue[index] <= this.minValue[index]) {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index] + 1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue is should be greater than minValue';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index]), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = '';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
      }
      else if (index == 1 || index == 2 || index == 3 || index == 4) {
        if (this.maxValue[index] === '' || this.maxValue[index] === null || this.maxValue[index] === undefined) {
          this.maxError = 'maxValue iss required';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (NUMBER_REGEXP.test(this.maxValue[index]) === false) {
          console.log(NUMBER_REGEXP.test(this.maxValue[index]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue is entered wrong';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.maxValue[index] <= 0 || this.maxValue[index] >= 100) {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue iss should bee between 0 and 100';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.maxValue[index] < this.maxValue[index - 1]) {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index] + 1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue iss should bee greater than previous maxValue';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else if (this.maxValue[index] <= this.minValue[index]) {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index] + 1), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = 'maxValue iss should bee greater than minValue';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
        else {
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index]), Validators.max(99)]));
          (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
          this.maxError = '';
          return (<FormArray>this.stepForm.get('meritData')).at(index);
        }
      }
      else {
        (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index]), Validators.max(99)]));
        (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
        this.maxError = '';
        return (<FormArray>this.stepForm.get('meritData')).at(index);
      }
    }
    else if (x && y && z) {
      (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index]), Validators.max(99)]));
      (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
      this.maxError = '';
      return (<FormArray>this.stepForm.get('meritData')).at(index);
    }
    else {
      (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].setValidators(Validators.compose([Validators.required, Validators.min(this.maxValue[index]), Validators.max(99)]));
      (this.stepForm.get('meritData') as any).controls[index].controls['maxValue'].updateValueAndValidity();
      this.maxError = '';
      return (<FormArray>this.stepForm.get('meritData')).at(index);
    }
  }

  onSaveData() {
    let minArr = [];
    let maxArr = [];
    for (let i = 0; i < this.stepForm.value.meritData.length; i++) {
      minArr.push(this.stepForm.value.meritData[i].minValue);
      maxArr.push(this.stepForm.value.meritData[i].maxValue);
    }
    console.log("minValues arr====>", minArr);
    console.log("maxValues arr====>", maxArr);
  }

}
