import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ConnectService } from './connect.service';

describe('ConnectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ConnectService]
    });
  });

  it('should be created', inject([ConnectService], (service: ConnectService) => {
    expect(service).toBeTruthy();
  }));
});
