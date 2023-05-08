import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchServiceService } from 'src/Auth/Weathersearch-service.service';

@Component({
  selector: 'app-weatherforecast',
  templateUrl: './weatherforecast.component.html',
  styleUrls: ['./weatherforecast.component.css']
})
export class WeatherforecastComponent implements OnInit {

  cities: any = [];
  totalResults: any;
  favColor = "red"
  found = false;
  loading= true;
  flag = false;
  citieslist: any=[];
  forecastday:any[]=[]
  forecastdayf:any[]=[]

  city: any;
  days:string=''
  constructor(public searchService: SearchServiceService, private snack: MatSnackBar) { }
  ngDoCheck(): void {
    
  }

  ngOnInit(): void 
  { 
  
  }

  fetchWeatherForecast(){

    this.searchService.GetWeatherDetails(this.city,this.days).subscribe((resp:any)=> {
 // this.forecast=response.forecast.forcastday;
      console.log("---")
      
this.forecastday=resp.list;

let c=0;
var days=parseInt(this.days);

for (let i = 0; i < this.forecastday.length && c < days;) {
  this.forecastdayf[c]=this.forecastday[i];
  console.log(i+" "+c)
  c++;
  i=i+8;
}
console.log("----")

console.log(this.forecastdayf)


      this.ngOnInit();
  
      this.snack.open("Loaded", "OK",{duration:2000,
        panelClass: ['mat-toolbar', 'mat-Success']});
      
  
    },
      (      error: { error: string; }) => {
  
         console.log("--"+error.error)
         this.snack.open("Something went wrong", "OK",{duration:4000,
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
