import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FavCityService } from '../watchlistcity.service';
import { GetCitiesService } from '../get-cities.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchServiceService } from 'src/Auth/Weathersearch-service.service';
import { City } from '../city';
@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class DashboardComponent implements OnInit,DoCheck {
  userCities: any = [];
  cities:any[]=[];
  city: any;
  totalResults: any;
  loading= true;
  test=[3,4,5,6,7]
  cityname:any;

  constructor(public cityService: GetCitiesService, public favcity: FavCityService, public searchService: SearchServiceService, 
              private snack: MatSnackBar) {
               }
  ngDoCheck(): void {
    this.cityname=localStorage.getItem('city');

  }


  ngOnInit(): void {

    this.updateFav();
    this.cityname=localStorage.getItem('city');
   /* this.cityService.getAll().subscribe(data => {



      this.searchService.getWeatherByCity(cityname).subscribe((data:any)=>
      {
        this.city = data;

      }

      this.cities=data;
          for(var key in this.cities){
            var val=this.cities[key];
            console.log('6666'+val)
          }
      this.loading=false;

    },
    */
   
    this.searchService.fetchWeatherDataByCity(this.cityname).subscribe((data:any)=>
    {
      this.city = data;
      this.cities.push(this.city);

      var temp = this.city.temp; 
      var mintemp = this.city.mintemp; 
   
      var maxtemp = this.city.maxtemp; 
   
      
      this.city.temp = (temp - 273) | 0;
      this.city.mintemp =( mintemp - 273) | 0;
      this.city.maxtemp = (maxtemp - 273) | 0;

      var alert=this.city.weatherDescription+'';
        alert=alert.toLowerCase();
      if(alert.indexOf('rain')!=-1 || alert.indexOf('storm')!=-1)
      {
      this.snack.open("             Rain Alert !              ","OK",{duration:2000,
        panelClass: ['mat-toolbar', 'mat-warn']});
      }

      

    },
    error=>
    {
      this.loading=false;
      console.log(error.error);
    })
   // this.cities = this.city;



  }

  convertTime(t: any){
    var date = new Date(t * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    //console.log(formattedTime);
    return formattedTime;
  }

  favToggle(city: any = []) {

    this.favcity.favToggle(city.name).subscribe(resp => {

      if(city.toggleString === 'Favourite')
      {
        city.toggleString = 'Unfavourite'
        city.toggleColor = "red"
        this.snack.open("Added to favourites","OK",{duration:2000,
          panelClass: ['mat-toolbar', 'mat-primary']});
      }
      else
      {
        city.toggleString = 'Favourite';
        city.toggleColor = "green"
        this.snack.open("Removed from favourites","OK",{duration:2000,
          panelClass: ['mat-toolbar', 'mat-warn']});
      }

      console.log(resp);
    },
      error => {// console.log(error)
      }
    );
  }

  getVisibility(metre:any)
  {
    var miles = metre * 0.00062131;
    var visibility:string;
    if(miles < 1)
      visibility = "Dense fog";
    else if(miles < 2)
      visibility = "Thick Fog";
    else if(miles < 3)
      visibility = "Fog";
    else if(miles < 4)
      visibility = "Moderate Fog";
    else if(miles < 5)
      visibility = "Thin Fog";
    else if(miles < 6)
      visibility = "Visibility poor";
    else if(miles < 7)
      visibility = "Visibility moderate";
    else if(miles < 8)
      visibility = "Visibility good";
    else if(miles < 9)
      visibility = "Visibility very good";
    else
      visibility = "Visibility Excellent";
  
      return visibility;
    
  }

  updateFav():void {
    this.searchService.getUserWishlist().subscribe((data:any)=>
    {
        console.log("####"+data.body);

      for(var user in data)
      {
        this.userCities.push(user);
      }
      
    },
    error=>
    {
      console.log(error.error);
    });

  }

  public showRandomly(bias:number) {
    return Math.random() < bias;
}

getDate(): string
{
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toDateString();
}


}
