import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookModule } from 'ngx-facebook';

import { SignUpComponent } from './sign-up.component';
import { routing } from './sign-up.routing';

@NgModule({
  imports: [
    CommonModule,
    FacebookModule,
    routing
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
