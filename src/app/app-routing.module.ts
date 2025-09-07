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
import { TransferComponent } from './account/transfer/transfer.component';
import { SettlementComponent } from './settlement/settlement.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'admin/dashboard', component: AdmindashboardComponent },
  { path: 'admin/adduser', component: AddUserComponent },
  { path: 'admin/view-user/:id', component: ViewUserComponent },
  { path: 'admin/view-all-users', component: ViewAllUserComponent },
  { path: 'admin/user/:userId/update', component: UpdateUserComponent },

  { path: 'admin/addbank', component: AddBankComponent },
  { path: 'admin/view-bank/:id', component: ViewBankComponent },
  { path: 'admin/view-all-banks', component: ViewAllBanksComponent },
  { path: 'admin/bank/:bankId/update', component: UpdateBankComponent },
  { path: 'admin/bank/settlement', component: SettlementComponent},


  { path: 'user/dashboard', component: UserdashboardComponent },
  { path: 'user/view-all-accounts', component: ViewAllAccountsComponent },
  { path: 'user/account/:accountId/passbook', component: PassbookComponent },
  { path: 'user/account/:accountId/deposit', component: DepositeComponent },
  { path: 'user/account/:accountId/withdraw', component: WithdrawComponent },
  { path: 'user/account/:accountId/transfer', component: TransferComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

