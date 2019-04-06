import { TestBed } from '@angular/core/testing';

import { SendMessageToServerService } from './send-message-to-server.service';

describe('SendMessageToServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendMessageToServerService = TestBed.get(SendMessageToServerService);
    expect(service).toBeTruthy();
  });
});
