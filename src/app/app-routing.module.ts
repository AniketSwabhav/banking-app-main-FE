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
import { ViewBankComponent } from './bank/view-bank/view-bank.component';
import { ViewAllAccountsComponent } from './account/view-all-accounts/view-all-accounts.component';
import { PassbookComponent } from './account/passbook/passbook.component';
import { DepositeComponent } from './account/deposite/deposite.component';
import { WithdrawComponent } from './account/withdraw/withdraw.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin/dashboard', component: AdmindashboardComponent },
  { path: 'admin/adduser', component: AddUserComponent },
  { path: 'admin/view-user/:id', component: ViewUserComponent },
  { path: 'admin/view-all-users', component: ViewAllUserComponent },

  { path: 'user/update/:id', component: UpdateUserComponent },

  { path: 'admin/addbank', component: AddBankComponent },
  { path: 'admin/view-bank/:id', component: ViewBankComponent },
  { path: 'admin/view-all-banks', component: ViewAllBanksComponent },
  { path: 'bank/update/:id', component: UpdateBankComponent },

  { path: 'user/view-all-accounts', component: ViewAllAccountsComponent },


  { path: 'user/dashboard', component: UserdashboardComponent },
  { path: 'user/account/passbook/:accountId', component: PassbookComponent },
  { path: 'user/account/deposite', component: DepositeComponent },
  { path: 'user/account/withdraw', component: WithdrawComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

