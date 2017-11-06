import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CardResultComponent } from './card-result.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CardResultComponent],
  exports: [CardResultComponent]
})
export class CardResultModule { }
