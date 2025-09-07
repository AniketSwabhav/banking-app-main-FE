import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ViewBankComponent } from './bank/view-bank/view-bank.component';
import { TransferComponent } from './account/transfer/transfer.component';

@NgModule({
  declarations: [AppComponent, ViewBankComponent],
  imports: [HttpClientModule ,BrowserModule,NavbarComponent, AppRoutingModule],
  providers: [ JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
  bootstrap: [AppComponent]
})
export class AppModule { }
