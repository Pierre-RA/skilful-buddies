import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';

import { UsersService } from '../../shared/users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HeaderModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    InlineEditorModule
  ],
  declarations: [ProfileComponent],
  providers: [UsersService]
})
export class ProfileModule { }
