import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTradeComponent } from './card-trade.component';

describe('CardTradeComponent', () => {
  let component: CardTradeComponent;
  let fixture: ComponentFixture<CardTradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
