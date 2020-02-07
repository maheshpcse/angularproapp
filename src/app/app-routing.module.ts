import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { CommonComponent } from './common/common.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthGuardService } from './auth-guard.service';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserActivitiesComponent } from './user-activities/user-activities.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ManagerProfileComponent } from './manager/manager-profile/manager-profile.component';
import { AttandanceComponent } from './attandance/attandance.component';
import { LeavesComponent } from './leaves/leaves.component';
import { AccountsComponent } from './accounts/accounts.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { TasksComponent } from './tasks/tasks.component';


const routes: Routes = [
  {
    path: '',
    component: CommonComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'dashbaord',
  //   pathMatch: 'full'
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'settings',
    canActivate: [AuthGuardService],
    component: SettingsComponent
  },
  {
    path: 'notifications',
    canActivate: [AuthGuardService],
    component: NotificationsComponent
  },

  // admin routes
  // {
  //   path: 'admin/profile',
  //   canActivate: [AuthGuardService],
  //   component: AdminProfileComponent
  // },
  // {
  //   path: 'admin/dashboard',
  //   canActivate: [AuthGuardService],
  //   component: DashboardComponent
  // },
  // {
  //   path: 'admin/tasks',
  //   canActivate: [AuthGuardService],
  //   component: TasksComponent
  // },
  // {
  //   path: 'admin/forms',
  //   canActivate: [AuthGuardService],
  //   component: FormsComponent
  // },
  // {
  //   path: 'admin/tables',
  //   canActivate: [AuthGuardService],
  //   component: TablesComponent
  // },
  // {
  //   path: 'admin/companies',
  //   canActivate: [AuthGuardService],
  //   component: CompaniesComponent
  // },

  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuardService]
  },
  
  // user routes
  {
    path: 'user/profile',
    canActivate: [AuthGuardService],
    component: UserProfileComponent
  },
  {
    path: 'user/dashboard',
    canActivate: [AuthGuardService],
    component: UserDashboardComponent
  },
  {
    path: 'user/services',
    canActivate: [AuthGuardService],
    component: UserServicesComponent
  },
  {
    path: 'user/activities',
    canActivate: [AuthGuardService],
    component: UserActivitiesComponent
  },
  {
    path: 'user/chat',
    canActivate: [AuthGuardService],
    component: UserChatComponent
  },

  // {
  //   path: 'user',
  //   loadChildren: './user/user.module.ts#UserModule'
  // },

  // manager routes
  {
    path: 'manager/profile',
    canActivate: [AuthGuardService],
    component: ManagerProfileComponent
  },
  {
    path: 'manager/dashboard',
    component: ManagerDashboardComponent
  },
  {
    path: 'manager/attandance',
    canActivate: [AuthGuardService],
    component: AttandanceComponent
  },
  {
    path: 'manager/leaves',
    canActivate: [AuthGuardService],
    component: LeavesComponent
  },
  {
    path: 'manager/accounts',
    canActivate: [AuthGuardService],
    component: AccountsComponent
  },

  // {
  //   path: 'manager',
  //   loadChildren: './manager/manager.module.ts#ManagerModule',
  // },

  // not found page route
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
