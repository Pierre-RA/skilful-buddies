import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';

import { ProfileComponent } from './profile.component';
import { HeaderModule } from '../../templates/header/header.module';
import { CardSkillModule } from '../../templates/card-skill/card-skill.module';
import { CardTradeModule } from '../../templates/card-trade/card-trade.module';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HeaderModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        InlineEditorModule,
        CardSkillModule,
        CardTradeModule,
      ],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
