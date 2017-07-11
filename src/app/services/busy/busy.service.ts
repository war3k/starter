import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BusyService {
	private busy =  new Subject<any>();

	constructor() { }

	show(){
		this.busy.next({show: true});
	}
	hide(){
		this.busy.next({show: false});
	}

	getBusy(): Observable<any> {
		return this.busy.asObservable();
	}
}
