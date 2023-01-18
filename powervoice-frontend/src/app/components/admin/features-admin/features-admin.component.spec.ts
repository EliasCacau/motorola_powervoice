import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesAdminComponent } from './features-admin.component';

describe('FeaturesAdminComponent', () => {
  let component: FeaturesAdminComponent;
  let fixture: ComponentFixture<FeaturesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
