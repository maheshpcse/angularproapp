import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { TasksComponent } from '../tasks/tasks.component';
import { FormsComponent } from '../forms/forms.component';
import { TablesComponent } from '../tables/tables.component';
import { CompaniesComponent } from '../companies/companies.component';
import { DataTableModule } from 'ng-angular8-datatable';
import { FileUploadModule } from 'ng2-file-upload';
import { HeaderComponent } from '../header/header.component';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminProfileComponent,
    TasksComponent,
    FormsComponent,
    TablesComponent,
    CompaniesComponent,
    HeaderComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    BrowserAnimationsModule,
    DataTableModule,
    FileUploadModule
  ]
})
export class AdminModule { }
