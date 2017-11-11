import { Component, OnInit } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() {
    PageScrollConfig.defaultDuration = 500;
  }

  ngOnInit() {
  }

}
