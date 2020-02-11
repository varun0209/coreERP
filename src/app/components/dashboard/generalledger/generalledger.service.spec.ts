import { TestBed } from '@angular/core/testing';

import { GeneralledgerService } from './generalledger.service';

describe('GeneralledgerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralledgerService = TestBed.get(GeneralledgerService);
    expect(service).toBeTruthy();
  });
});
