import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TasksComponent } from '../tasks/tasks.component';
import { FormsComponent } from '../forms/forms.component';
import { TablesComponent } from '../tables/tables.component';
import { CompaniesComponent } from '../companies/companies.component';


const routes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: AdminProfileComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: 'tasks',
    canActivate: [AuthGuardService],
    component: TasksComponent
  },
  {
    path: 'forms',
    canActivate: [AuthGuardService],
    component: FormsComponent
  },
  {
    path: 'tables',
    canActivate: [AuthGuardService],
    component: TablesComponent
  },
  {
    path: 'companies',
    canActivate: [AuthGuardService],
    component: CompaniesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
