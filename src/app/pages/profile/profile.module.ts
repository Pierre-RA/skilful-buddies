import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    HeaderModule
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
