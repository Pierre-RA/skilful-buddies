import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TradeComponent } from './trade.component';
import { routing } from './trade.routing';

import { HeaderModule } from '../../templates/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  declarations: [TradeComponent]
})
export class TradeModule { }
