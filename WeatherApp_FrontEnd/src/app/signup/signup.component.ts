import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
 // url = "assets/images/def_avatar.png"
  constructor(private services: ServicesService, private router: Router, private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  // onSubmit() {

  //   if (this.user.userName != '' && this.user.password != '' && this.user.fullName != '' && this.user.email != '') {
     

  //   this.services.signUpUser(this.user).subscribe(data => {

  //     console.log(data);
  //     this.snack.open("User Registered Successfully", "OK", {duration:3000});

  //     this.goToLogin();
  //   }
  //   );

  // }
  // else
  // {
  //   this.snack.open("Fields cannot be left empty", "OK", {duration:3000});
  // }
  // }

  onSubmit() {

    if (this.user.name == null || this.user.password == null  || this.user.name === '' && this.user.password === '')
    {
      if(this.user.name == null || this.user.name === '')
      {
        this.snack.open("Please provide valid UserName", "X", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
      }
      else
      this.snack.open("Fields cannot be left empty", "OK", {duration:3000});
    }
    else
    {
      
    this.services.signUpUser(this.user).subscribe(data => {
      localStorage.setItem('city',this.user.city)
      console.log(data);
      this.snack.open("User Registered Successfully", "OK", {duration:3000});

      this.goToLogin();
    }
    );
    }

  
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }


}
