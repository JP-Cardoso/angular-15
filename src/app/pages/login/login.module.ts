import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ContinuationRegisterComponent } from 'src/app/components/login/continuation-register/continuation-register.component';
import { LognRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material-shared/material-shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    ContinuationRegisterComponent,
  ],
  imports: [
    CommonModule,
    LognRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule
  ]
})
export class LoginModule { }
