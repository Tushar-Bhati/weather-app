import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavCityService } from './watchlistcity.service';
import { ServicesService } from './services.service';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from './user-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,DoCheck{
  title = 'weathersite';
  user_name:any;
  //picName:string="def_avatar.png"
 // profileAvatar = "/assets/images/" + this.picName;

  constructor(private services: ServicesService, private favcity: FavCityService, private router: Router, private userService: UserServiceService, private dialog: MatDialog) { }
  ngDoCheck(): void {
    
    if(localStorage.getItem("userName"))
    {
      this.user_name = ""+localStorage.getItem("userName");
    }

  }

  @Input()
  public loggedIn = false;
  @Input()
  public userName: any;


  ngOnInit(): void {
    this.loggedIn = this.services.isLoggedIn();

    // extract all user info for updating header
   // console.log("inside app comp");
    this.userService.getLoggedInUserInfo.subscribe((resp:any) => {
      //console.log("inside app comp subscribe :" + resp);
      this.user_name = resp.name;
     
    
    });

  
    if(localStorage.getItem("userName"))
    {
      this.user_name = ""+localStorage.getItem("userName");
    }

    
  }

  logOut() {

    this.services.logout().subscribe();

    this.loggedIn = this.services.isLoggedIn();
  }



}

