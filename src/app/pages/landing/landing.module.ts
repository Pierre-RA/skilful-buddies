import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

import { LandingComponent } from './landing.component';
import { routing } from './landing.routing';

import { HeaderModule } from '../../templates/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    Ng2PageScrollModule,
    HeaderModule
  ],
  declarations: [LandingComponent]
})
export class LandingModule { }
