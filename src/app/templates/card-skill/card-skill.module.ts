import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'angular2-markdown';

import { CardSkillComponent } from './card-skill.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MarkdownModule
  ],
  declarations: [CardSkillComponent],
  exports: [CardSkillComponent]
})
export class CardSkillModule { }
