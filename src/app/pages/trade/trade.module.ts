import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TradeComponent } from './trade.component';
import { routing } from './trade.routing';

import { SearchService } from '../../shared/search.service';

import { HeaderModule } from '../../templates/header/header.module';
import { CardResultModule } from '../../templates/card-result/card-result.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    CardResultModule
  ],
  declarations: [TradeComponent],
  providers: [SearchService]
})
export class TradeModule { }
