import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';

import { HeaderModule } from '../../templates/header/header.module';
import { CardSkillModule } from '../../templates/card-skill/card-skill.module';
import { CardTradeModule } from '../../templates/card-trade/card-trade.module';

import { UsersService } from '../../shared/users.service';
import { SkillsService } from '../../shared/skills.service';

import { BadgePipe } from '../../pipes/badge.pipe';
import { AgePipe } from '../../pipes/age.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HeaderModule,
    CardSkillModule,
    CardTradeModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule,
    InlineEditorModule
  ],
  declarations: [ProfileComponent, BadgePipe, AgePipe],
  providers: [UsersService, SkillsService]
})
export class ProfileModule { }
