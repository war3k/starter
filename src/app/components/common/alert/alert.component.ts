import { Component, OnInit } from '@angular/core';
import { AlertService } from './../../../services/index'

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  message: any;
	active = false;
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage()
		.subscribe(
			message => {
        this.message = message;
        if(this.message){
					this.active = true;
				}
      });
  }
	close(){
		this.active = false;
		setTimeout(() => this.message = null, 1300);
	}
}
