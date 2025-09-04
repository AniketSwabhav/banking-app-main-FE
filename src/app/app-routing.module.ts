import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './user/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewAllUserComponent } from './user/view-all-user/view-all-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { ViewAllBanksComponent } from './bank/view-all-banks/view-all-banks.component';
import { UpdateBankComponent } from './bank/update-bank/update-bank.component';
import { AddBankComponent } from './bank/add-bank/add-bank.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin/dashboard', component: AdmindashboardComponent },
  { path: 'admin/adduser', component: AddUserComponent},
  { path: 'admin/view-all-users', component: ViewAllUserComponent},
  { path: 'admin/view-user/:id', component: ViewUserComponent},
  { path: 'admin/view-all-banks', component: ViewAllBanksComponent},
  { path: 'admin/addbank', component: AddBankComponent},
  { path: 'bank/update/:id', component: UpdateBankComponent},

  { path: 'user/dashboard', component: UserdashboardComponent },
  { path: 'user/update/:id', component: UpdateUserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

