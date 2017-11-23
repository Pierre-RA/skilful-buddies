import { Component, OnInit, Input } from '@angular/core';

import { Skill } from '../../shared';

@Component({
  selector: 'template-card-skill',
  templateUrl: './card-skill.component.html',
  styleUrls: ['./card-skill.component.scss']
})
export class CardSkillComponent implements OnInit {

  @Input('skill') skill: Skill;

  constructor() { }

  ngOnInit() {
  }

}
