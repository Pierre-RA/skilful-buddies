import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Skill } from '../../shared';

@Component({
  selector: 'template-card-skill',
  templateUrl: './card-skill.component.html',
  styleUrls: ['./card-skill.component.scss']
})
export class CardSkillComponent implements OnInit {

  @Input('skill') skill: Skill;
  @Input('editable') editable: boolean;
  @Output() onEdit = new EventEmitter<Skill>();

  constructor() { }

  ngOnInit() {
    console.log(this.skill);
  }

  edit() {
    this.onEdit.emit(this.skill);
  }

}
