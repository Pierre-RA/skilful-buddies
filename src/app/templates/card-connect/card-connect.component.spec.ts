import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardConnectComponent } from './card-connect.component';

describe('CardConnectComponent', () => {
  let component: CardConnectComponent;
  let fixture: ComponentFixture<CardConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
