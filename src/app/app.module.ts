import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './shared/material-shared/material-shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-top-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
