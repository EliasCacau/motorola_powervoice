import { TestBed } from '@angular/core/testing';
import { ReportCategoryService } from './report-category.service';

describe('ReportCategoryService', () => {
  let service: ReportCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
