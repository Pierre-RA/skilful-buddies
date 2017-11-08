import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpComponent } from './sign-up.component';
import { routing } from './sign-up.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }
