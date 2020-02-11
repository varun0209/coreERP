import { TestBed } from '@angular/core/testing';

import { InventoryService } from './Inventory.service';

describe('InventoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InventoryService = TestBed.get(InventoryService);
    expect(service).toBeTruthy();
  });
});
