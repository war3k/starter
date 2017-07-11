import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import {
  AlertService,
  BusyService,
  CommonService,
  AuthenticationService,
  UserService
} from './services/index';

import {
  AppComponent,
  AlertComponent,
  BusyComponent,
  HomeComponent,
  LoginComponent,
  RegisterComponent,
  UserComponent
} from './components/index';

import { AuthGuard } from './guards/auth.guard';

// Define the routes
const ROUTES = [

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users/new',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:_id',
    component: UserComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    BusyComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AlertService,
    BusyService,
    CommonService,
    AuthenticationService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
