import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loaders/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(
    public servicoLoader: LoaderService,
  ) { }
  progress = 0;

  animateProgress() {
    setInterval( () => {
      this.progress = 100? this.progress = 0 :
      this.progress+=20;
    },500);
  }  

  ngOnInit(): void {
    
  }

}
