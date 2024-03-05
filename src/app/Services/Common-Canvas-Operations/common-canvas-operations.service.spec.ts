import { TestBed } from '@angular/core/testing';

import { CommonCanvasOperationsService } from './common-canvas-operations.service';

describe('CommonCanvasOperationsService', () => {
  let service: CommonCanvasOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonCanvasOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
