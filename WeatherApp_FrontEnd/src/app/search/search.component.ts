import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchServiceService } from 'src/Auth/Weathersearch-service.service';
import { FavCityService } from '../watchlistcity.service';
import { GetCitiesService } from '../get-cities.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value = '';
  city: any;
  found:Boolean = false;
  loading = false;
  userCities:any = [];
  toggleString = "Add to favourites";
  toggleColor = "blue";
  viewCard = false;
  flag:Boolean=false;
  constructor(public searchService: SearchServiceService,public cityService: GetCitiesService, public favcity: FavCityService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.updateFav();
  }

  updateFav():void {
    this.searchService.getUserWishlist().subscribe((data:any)=>
    {
      for(var user in data)
      {
        console.log(user+"---")
        this.userCities.push(data[user]);
      }
      console.log("ooo"+this.userCities)
    },
    error=>
    {
      console.log(error.error);
    });

  }

  buttonClick()
  {
    this.flag=true;

    if(this.value === '')
    {
      this.snack.open("Please enter the city name!","X",{duration:40000,
        panelClass: ['mat-toolbar', 'mat-warn']});
    }
    else
    {
      this.found = false;
      this.loading = true;
      this.searchService.fetchWeatherDataByCity(this.value).subscribe((data:any)=>
      {
        this.city = data;
        console.log(data);

        // toggle fav
        this.updateFav();
        let isFound = false;
        for(var cityName of this.userCities)
        {
          console.log(cityName +" === "+this.city.name)
          if(cityName === this.city.name)
          {
            
            this.toggleString = 'Remove from favourites'
            this.toggleColor = "red"
            isFound = true;
            break;
          }
        }
        if(!isFound)
        {
        this.toggleString = 'Add to favourites';
        this.toggleColor = "green";
        }

        this.viewCard=true;
        setTimeout(() => 
      {
        this.found = true;
        this.loading = false;
      },
      500);

      },
      error =>
      {
        this.snack.open("City name is wrong!","Ok");
        this.found = false;
        this.loading=false;
      }
      );
      
    }

    
    
  }

  favToggle() {

    this.favcity.favToggle(this.city.name).subscribe(resp => {

      console.log("this.toggleString === 'Add to favourites'"+this.toggleString === 'Add to favourites');
      if(this.toggleString === 'Add to favourites')
      {
        this.toggleString = 'Remove from favourites'
        this.toggleColor = "red"
        this.snack.open("Added to favourites","OK",{duration:2000,
          panelClass: ['mat-toolbar', 'mat-primary']});
      }
      else
      {
        this.toggleString = 'Add to favourites';
        this.toggleColor = "blue"
        this.snack.open("Removed from favourites","OK",{duration:2000,
          panelClass: ['mat-toolbar', 'mat-warn']});
      }
      this.updateFav();
    },
      error => { console.log(error) }
    );
  }

  toggleViewCard()
  {
    if(this.viewCard === true)
    this.viewCard = false;
    else
    this.viewCard = true;
  }

  getDate(): string
  {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toDateString();
  }


}


