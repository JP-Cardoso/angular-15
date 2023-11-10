import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialSharedModule } from 'src/app/shared/material-shared/material-shared.module';
import { BalanceTotalCardComponent } from 'src/app/components/dashboard/balance-total-card/balance-total-card.component';
import { CardViewComponent } from 'src/app/components/dashboard/card-view/card-view.component';
import { DebtsCardComponent } from 'src/app/components/dashboard/debts-card/debts-card.component';
import { DebtsComponent } from 'src/app/components/dashboard/debts/debts.component';
import { FooterComponent } from 'src/app/components/dashboard/footer/footer.component';
import { ImgProfileComponent } from 'src/app/components/dashboard/img-profile/img-profile.component';
import { MenuComponent } from 'src/app/components/dashboard/menu/menu.component';
import { RevenuesCardComponent } from 'src/app/components/dashboard/revenues-card/revenues-card.component';
import { RevenuesComponent } from 'src/app/components/dashboard/revenues/revenues.component';
import { MessageHourComponent } from 'src/app/components/message-hour/message-hour.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRevenuesComponent } from 'src/app/components/dashboard/add-revenues/add-revenues.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MenuComponent,
    RevenuesCardComponent,
    DebtsCardComponent,
    BalanceTotalCardComponent,
    RevenuesComponent,
    DebtsComponent,
    FooterComponent,
    MessageHourComponent,
    ImgProfileComponent,
    CardViewComponent,
    AddRevenuesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
