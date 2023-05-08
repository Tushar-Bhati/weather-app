import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { updatepassword } from './utility/Updatepassword/updatepassword.component';
import { ServicesService } from './services.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor( private httpClient: HttpClient, private services: ServicesService ) { }

  private baseUrl = "http://localhost:9191/user";

  public getLoggedInUserInfo = new Subject();
  
  fetchAccountDetails(): Observable<User> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',"Bearer "+this.services.getToken()).
        set('Content-Type', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
    }
    var user=localStorage.getItem('userName')
    return this.httpClient.get<User>(`${this.baseUrl}`+"/account/"+user, header);
  }

  updateUser(user: updatepassword): Observable<any> {
    const requestOptions: Object = {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+this.services.getToken())
      .set('Content-Type', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*'),
      responseType: 'text'
    }
    var users=localStorage.getItem('userName')
    return this.httpClient.post(`${this.baseUrl}` + "/update/password"+"/"+users, user, requestOptions);
  }

  updateUsers(user: User): Observable<any> {
    const requestOptions: Object = {
      headers: new HttpHeaders().append('Authorization', 'Bearer '+this.services.getToken()).set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*'),
      responseType: 'text'
    }
    var users=localStorage.getItem('userName')
    return this.httpClient.post(`${this.baseUrl}` + "/update", user, requestOptions);
  }

  public savePic() {
    this.fetchAccountDetails().subscribe((data:User)=>
    {
      if(localStorage.getItem("pic"))
      {
      }
      else{
      console.log("saved profilePicture");

      this.getLoggedInUserInfo.next(data);

      }
      

    },
    error=>
    {
      console.log(error.error);
    });

  }

}
