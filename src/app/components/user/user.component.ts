import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService, BusyService} from './../../services/index';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
model: any = {};
edit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService,
		private busyService: BusyService
		) { }

  ngOnInit() {
    let _id;
    this.route.params.subscribe(params => {
      _id = params['_id'];
    });
    if (_id && _id != 'new') {
      this.edit = true;
      this.getUser(_id);
    }
  }
  getUser(_id:string){
    this.busyService.show();
    this.userService.getById(_id)
      .subscribe(
        data => {
          this.busyService.hide();
          this.model = data;
        },
        error => {
          this.busyService.hide();
          this.alertService.error('Nie można pobrać użytkownika! Spróbuj później.');
          this.router.navigate(['/']);
        });
  }
  submitForm(){
    if(this.edit) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }
  addUser() {
    this.busyService.show();
    this.userService.create(this.model)
      .subscribe(
        data => {
					this.busyService.hide();
          this.alertService.success('Dodano użytkownika!', true);
          this.router.navigate(['/']);
        },
        error => {
					this.alertService.error(error._body);
          this.busyService.hide();
  	  	});
	}
  updateUser() {
    this.busyService.show();
    this.userService.update(this.model)
      .subscribe(
        data => {
					this.busyService.hide();
          this.alertService.success('Zaktualizowano użytkownika!', true);
          this.router.navigate(['/']);
        },
        error => {
					this.alertService.error(error._body);
          this.busyService.hide();
  	  	});
	}

}
