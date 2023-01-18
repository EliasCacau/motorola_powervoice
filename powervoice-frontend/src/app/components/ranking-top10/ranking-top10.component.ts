import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { Feature } from 'src/app/models/features/feature.model';
import { FeatureService } from 'src/app/services/features/feature.service';

@Component({
  selector: 'app-ranking-top10',
  templateUrl: './ranking-top10.component.html',
  styleUrls: ['./ranking-top10.component.scss']
})
export class RankingTop10Component{

  constructor(
    private servicoFeature: FeatureService,
  ) { }
  
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  showNavigationIndicators = false;

  top10Features: Feature[] = Array<Feature>();

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  getTop10() {
    this.servicoFeature.rankingTop10().subscribe({
      next: (resposta: Feature[]) => {
        this.top10Features = resposta;
      }
    });
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnInit(): void {
    this.getTop10();
  }

}
