import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTop10Component } from './ranking-top10.component';

describe('RankingTop10Component', () => {
  let component: RankingTop10Component;
  let fixture: ComponentFixture<RankingTop10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingTop10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingTop10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
