import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';

import { UsersService } from '../../shared/users.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    HeaderModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule
  ],
  declarations: [ProfileComponent],
  providers: [UsersService]
})
export class ProfileModule { }
