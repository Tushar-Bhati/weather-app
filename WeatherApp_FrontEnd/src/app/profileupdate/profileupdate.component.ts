import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './profileupdate.component.html',
  styleUrls: ['./profileupdate.component.css']
})
export class UpdateAccountComponent implements OnInit {

  user: User= new User();
  url = "assets/images/def_avatar.png"
  removePic_flag = false;

  constructor(private userService: UserServiceService, private snack: MatSnackBar) { }

  ngOnInit(){

    this.removePic_flag = false;

    this.userService.fetchAccountDetails().subscribe((data: User) => {
      this.user=data;
    },
     error => { console.log(error) }
    );
  }

  onSubmit() {
    console.log(this.user);

  
    var userDetails = this.user;
    if(this.removePic_flag)
    {
      this.removePic_flag = false;
    }
    this.userService.updateUsers(userDetails).subscribe((data:User) =>
    {
        console.log("dsdvsd"+data);
        this.snack.open("Account Updated Successfully","OK",{duration:3000});
        localStorage.setItem('city',this.user.city)
        // update userInfo in local storage
        //localStorage.removeItem("pic");
        this.userService.savePic();

       /* setTimeout(() => 
      {
       // console.log("change---pic---> "+localStorage.getItem("pic"));
        this.url = "/assets/images/"+localStorage.getItem("pic");
      },
      500);*/
        
    },
    
    error=>
    {
      console.log(error);
      this.snack.open(error.error,"CANCEL");
    })
  }




}
