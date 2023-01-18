import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciasComponent } from './denuncias.component';

describe('DenunciasComponent', () => {
  let component: DenunciasComponent;
  let fixture: ComponentFixture<DenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenunciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
