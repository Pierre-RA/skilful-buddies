import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';

import { UsersService } from '../../shared/users.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    HeaderModule
  ],
  declarations: [ProfileComponent],
  providers: [UsersService]
})
export class ProfileModule { }
