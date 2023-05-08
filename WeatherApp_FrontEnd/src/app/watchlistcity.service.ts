import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class FavCityService {

  constructor(private httpClient: HttpClient, private services: ServicesService) { }
  private baseUrl = "http://localhost:9191/wishlist";

  favToggle(cityName: string): Observable<any> {

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    }
    
    let user=localStorage.getItem('userName');
    return this.httpClient.get<any>(`${this.baseUrl}`+"/add/"+cityName+"/"+user, header); 
  }

  
  favToggleRemove(cityName: string): Observable<any> {

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    }
    
    let user=localStorage.getItem('userName');
    return this.httpClient.delete<any>(`${this.baseUrl}`+"/delete/"+cityName+"/"+user, header); 
  }

  getAllFavCitiesOfUser():Observable<any>
  {
    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    }
    var user=localStorage.getItem('userName');
    return this.httpClient.get<any>(`${this.baseUrl}` + "/all/"+user, header);

  }



}
