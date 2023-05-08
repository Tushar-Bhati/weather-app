import { Component, DoCheck, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchServiceService } from 'src/Auth/Weathersearch-service.service';
import { FavCityService } from '../watchlistcity.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class FavouritesComponent implements OnInit,DoCheck {

  cities: any = [];
  totalResults: any;
  favColor = "red"
  found = false;
  loading= true;
  flag = false;
  citieslist: any=[];
  constructor(public favcity: FavCityService, public searchService: SearchServiceService, private snack: MatSnackBar) { }
  ngDoCheck(): void {
    
  }

  ngOnInit(): void 
  { 
    this.cities = []
    this.loading = true;
    this.found = false;
    this.flag = false;
    this.favcity.getAllFavCitiesOfUser().subscribe((resp:any) =>
      {
        console.log(resp.body);
        //this.cities=resp;
console.log("---")
        console.log(this.cities)

        for(var i of resp)
        {
          this.citieslist=i.cities;
        }
        console.log("---")
        console.log(this.citieslist)



        for(var city of this.citieslist)
        {
          this.loading=true;

          console.log(city);
          // get each fav city weather
          this.searchService.fetchWeatherDataByCity(city).subscribe((cityWeather:any)=>
          {
            //var time = this.convertTime(cityWeather.sys.sunrise);
            //cityWeather.sys.sunrise = time;
            //cityWeather.visibility = this.getVisibility(cityWeather.visibility);

            
      var temp = cityWeather.temp; 
      var mintemp = cityWeather.mintemp; 
   
      var maxtemp = cityWeather.maxtemp; 
   
      
      cityWeather.temp = (temp - 273) | 0;
      cityWeather.mintemp =( mintemp - 273) | 0;
      cityWeather.maxtemp = (maxtemp - 273) | 0;
            this.cities.push(cityWeather);
          }
        ,
        error =>
        {
          console.log(error.error);
        });
        
      }




        /* for(var key in resp.body)
        {
          console.log(typeof(resp[key]));
          var data  = resp[key];
          // get all fav cities
          for(var city of data)
          {
            console.log(city);
            // get each fav city weather
            this.searchService.getWeatherByCity(city).subscribe((cityWeather:any)=>
            {
              var time = this.convertTime(cityWeather.sys.sunrise);
              cityWeather.sys.sunrise = time;
              cityWeather.visibility = this.getVisibility(cityWeather.visibility);
              this.cities.push(cityWeather);

            }
          ,
          error =>
          {
            console.log(error.error);
          });
          
        }   
      } */

      
    },
      error =>
      {
        console.log(error);
      });

     
      setTimeout(() => 
      {
      this.loading = false;
      this.found = true;
      if(this.cities.length === 0)
      {
        this.flag = true;
      }
      },
      1000);
  
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


convertTime(t: any){
  var date = new Date(t * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  console.log(formattedTime);
  return formattedTime;
}

favToggle(cityWeather: any) {
  this.loading=true;
  
  this.favcity.favToggleRemove(cityWeather.name).subscribe(resp => {
    console.log(resp);

    this.cities.pop(cityWeather);
    this.favColor='blue'

    this.snack.open("Removed from Favourites", "OK",{duration:2000,
      panelClass: ['mat-toolbar', 'mat-warn']});
    

  },
    error => {

       console.log("--"+error.error)
       this.snack.open("Removed from the Favourite", "OK",{duration:4000,
        panelClass: ['mat-toolbar', 'mat-success']})
        this.refresh();
    }
  );
}

refresh(): void {
  window.location.reload();
}
getDate(): string
{
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return today.toDateString();
}

}

