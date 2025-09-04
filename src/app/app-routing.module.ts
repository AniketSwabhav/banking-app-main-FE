import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './user/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewAllUserComponent } from './user/view-all-user/view-all-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin/dashboard', component: AdmindashboardComponent },
  { path: 'admin/adduser', component: AddUserComponent},
  { path: 'admin/view-all-users', component: ViewAllUserComponent},

  { path: 'user/dashboard', component: UserdashboardComponent },
  { path: 'user/update/:id', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

