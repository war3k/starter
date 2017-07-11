import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService, AlertService, BusyService} from './../../services/index';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private busyService: BusyService
		) { }

  ngOnInit() {
    this.authenticationService.logout(); 
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.busyService.show();
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.busyService.hide();
          this.router.navigate([this.returnUrl]);
        },
        error => {
    	    this.alertService.error(error._body);
          this.busyService.hide();
        });
  }
}
