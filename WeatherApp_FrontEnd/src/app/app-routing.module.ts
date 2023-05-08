import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/Auth/auth-guard.service';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './utility/Updatepassword/updatepassword.component';
import { DashboardComponent } from './home/home.component';
import { FavouritesComponent } from './wishlist/wishlist.component';
import { WeatherforecastComponent } from './weatherforecast/weatherforecast.component';
import { LandingpageComponent } from './landingpage/landingpage.component'; 
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateAccountComponent } from './profileupdate/profileupdate.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: LandingpageComponent },
  { path: "login", component: LoginComponent },
  { path: "forecast", component: WeatherforecastComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: "favourites", component: FavouritesComponent, canActivate: [AuthGuardService]},
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: "search", component: SearchComponent, canActivate: [AuthGuardService]},
  { path: "updateProfile", component: UpdateAccountComponent, canActivate: [AuthGuardService]},
  { path: "changePassword", component: ChangePasswordComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
