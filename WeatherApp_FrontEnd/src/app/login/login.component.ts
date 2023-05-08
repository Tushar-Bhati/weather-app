import { HttpResponse } from '@angular/common/http';
import { Component, getModuleFactory, OnInit } from '@angular/core';
import { Login } from '../login';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login: Login = new Login();
  msg=false;

  constructor(private services: ServicesService, private router: Router, private appComp: AppComponent, private userService:UserServiceService,private snack: MatSnackBar) { }

  ngOnInit(): void {


  }

  onSubmit() {
    if (this.login.username != '' && this.login.password != '') {

      //console.log("We have to submit the form to server");


      this.services.loginUser(this.login).subscribe(
        resp => {

          this.services.token = resp.body.token;
          this.services.saveToken(this.services.token);
          this.services.saveUserName(this.login.username);
          this.appComp.loggedIn = this.services.isLoggedIn();

              this.userService.fetchAccountDetails().subscribe((data: User) => {
      localStorage.setItem('city',data.city)
    },
     error => { 
       console.log("==="+error) 
    
       


    }
    );

          this.goToDashboard();

        }
      );

    }
    else {
      console.log("Please enter username/password");
    }
  }

  goToDashboard() {
    this.router.navigate(["dashboard"]);
  }
}

export interface Resp {
  token: string
}
