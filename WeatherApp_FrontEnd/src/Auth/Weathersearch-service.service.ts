import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from 'src/app/city';
import { ServicesService } from 'src/app/services.service';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {


  private weatherApiUrl="http://localhost:9191/weather";
  private favApiUrl="http://localhost:9191/wishlist";
  token = "";
  constructor(private httpClient:HttpClient, private services:ServicesService) { }


  GetWeatherDetails(city: string, days: string):Observable<any> {

    let header = {
      headers: new HttpHeaders()
        .set('Authorization',"Bearer "+this.services.getToken())
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        
    }    
    return this.httpClient.get<any>(`${this.weatherApiUrl}`+"/forecast-data/"+city+"/"+days, header);
  }


  fetchWeatherDataByCity(cityName:string): Observable<City> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',"Bearer "+this.services.getToken())
        .set('Content-Type', 'application/json')
    }
    
    return this.httpClient.get<any>(`${this.weatherApiUrl}`+"/get/"+cityName, header);
    }

    getUserWishlist() :Observable<any>
    {
      var user=localStorage.getItem('userName');

      let header = {
        headers: new HttpHeaders()
          .set('Authorization',"Bearer "+this.services.getToken())
          .set('Content-Type', 'application/json')
      }
      return this.httpClient.get<any>(`${this.favApiUrl}`+"/all/"+user,  header);
    }
}
