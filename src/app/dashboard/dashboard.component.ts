import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  ImageForm: FormGroup;
  username: any = sessionStorage.getItem('id');
  image: File = null;

  @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
  @ViewChild('filesInput', { static: false }) filesInputRef: ElementRef;

  searchItem: any;
  hiddenItem: any;

  dataItems: any = [];
  searchRes: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.ImageForm = this.fb.group({
      ImageArr: this.fb.array([this.initForm()])
    })
    this.dataItems = ['MongoDB', 'ExpressJS', 'Angular', 'Node.JS'];
  }

  initForm() {
    return this.fb.group({
      image: new FormControl('', [Validators.required])
    })
  }

  addForm(i: any) {
    const control = this.ImageForm.controls['ImageArr'] as FormArray;
    control.push(this.initForm());
  }

  removeForm(i: any) {
    const control = this.ImageForm.controls['ImageArr'] as FormArray;
    control.removeAt(i);
  }

  selectedFile(event) {
    console.log(event.target.files[0]);
    this.image = <File>event.target.files[0];
    // this.image = this.fileInputRef.nativeElement.files[0];
  }

  uploadSingle() {
    const formData = new FormData();
    formData.append('username', this.username);
    formData.append('file', this.image, this.image.name);
    console.log(formData.get('file'));
    this.authService.uploadSingle(formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("File upload successful");
      } else {
        console.log("Failed to upload a file");
      }
    })
  }

  filesArr: any = [];
  formData = new FormData();

  selectedFiles(event) {
    console.log(event);
    // this.filesArr.push(<File>event.target.files[0]);
    // this.filesArr.push(this.filesInputRef.nativeElement.files[0]);
    // console.log("Files array is:", this.filesArr);
    for (let i = 0; i < event.length; i++) {
      this.formData.append('files', event[i], event[i]['name'])
    }
  }

  uploadMultiple() {
    this.formData.append('username', this.username);
    console.log(this.formData.get('username'));
    console.log(this.formData.getAll('files'));
    this.authService.uploadMultiple(this.formData).subscribe(res => {
      if (res['success'] == true) {
        console.log("Files upload successful");
      } else {
        console.log("Failed to upload files");
      }
    })
  }

  data: any = [];

  searchData(val: any) {
    console.log(val);
    for (let i = 0; i < this.dataItems.length; i++) {
      if (val == '' || val == null || val == undefined) {
        this.searchRes = false;
      }
      else if (this.dataItems[i].toLowerCase() == val.toLowerCase()) {
        this.searchRes = true;
        this.data.push(this.dataItems[i]);
      } else {
        this.searchRes = true;
        this.data[0] = 'No data found';
      }
    }
  }
}
