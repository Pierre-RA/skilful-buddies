import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';
import { CardSkillModule } from '../../templates/card-skill/card-skill.module';
import { CardTradeModule } from '../../templates/card-trade/card-trade.module';

import { UsersService } from '../../shared/users.service';

import { BadgePipe } from '../../pipes/badge.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HeaderModule,
    CardSkillModule,
    CardTradeModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    InlineEditorModule
  ],
  declarations: [ProfileComponent, BadgePipe],
  providers: [UsersService]
})
export class ProfileModule { }
