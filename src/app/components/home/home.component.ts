import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user.model';
import { UserService, AlertService, BusyService } from './../../services/index';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	currentUser: User;
	users: Array<User>;

	constructor(
		private userService: UserService, 
		private alertService: AlertService,
		private busyService: BusyService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	ngOnInit() {
		this.loadAllUsers();
	}
	loadAllUsers(){
		this.busyService.show();
		this.userService.getAll()
			.subscribe(
				data => {
					this.busyService.hide();
					this.users = data;
				},
				error => {
					this.busyService.hide();
					this.alertService.error(error._body);
				});
	}

	deleteUser(_id: string) {
		if(_id == this.currentUser._id){
			this.alertService.error('Nie możesz usunąć swojego konta!');
			return;
		}
		this.busyService.show();
		this.userService.delete(_id)
			.subscribe(
				data => {
					this.busyService.hide();
					this.alertService.success('Usunięto pomyślnie!'); 
					this.loadAllUsers();
				},
				error => {
					this.alertService.error(error._body);
					this.busyService.hide(); 
				});
	}
}
