import { Component, OnInit } from '@angular/core';
import { BusyService } from './../../../services/index';

@Component({
  selector: 'busy',
  templateUrl: './busy.component.html',
  styleUrls: ['./busy.component.scss']
})
export class BusyComponent implements OnInit {
  loading: boolean;
  constructor(private busyService: BusyService) { }

  ngOnInit() {
    this.busyService.getBusy()
      .subscribe(
        busy => {
          this.loading = busy.show;
        }
      )
  }

}
