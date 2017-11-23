import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardSkillComponent } from './card-skill.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CardSkillComponent],
  exports: [CardSkillComponent]
})
export class CardSkillModule { }
