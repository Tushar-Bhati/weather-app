import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
import { City } from './city';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class GetCitiesService {

  private baseUrl="http://localhost:9191/weatherapi";
  token = "";
  constructor(private httpClient: HttpClient, private services: ServicesService) { }
  
  getAll(): Observable<any> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',"Bearer "+this.services.getToken()).set('Content-Type', 'application/json').set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
    }
    console.log(this.services.getToken());

    
    return this.httpClient.get<any>(`${this.baseUrl}`+"/dashboard", header);
    }

}
