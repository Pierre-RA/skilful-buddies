import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
