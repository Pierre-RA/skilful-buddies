import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { ConnectComponent } from './connect.component';
import { HeaderModule } from '../../templates/header/header.module';

import { SearchService } from '../../shared/search.service';

export class NgbMockTypeaheadConfig extends NgbTypeaheadConfig {};

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule
      ],
      providers: [SearchService, {provide: NgbMockTypeaheadConfig}],
      declarations: [ ConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject([NgbTypeaheadConfig], (c: NgbTypeaheadConfig) => { c.showHint = true; }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
