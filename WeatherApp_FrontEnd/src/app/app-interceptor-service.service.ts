import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorServiceService implements HttpInterceptor {

  constructor(private snack: MatSnackBar) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
  
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(event.body);
            console.log(event);

            if (event.body == 'You are registered Successly!') {
              this.snack.open(event.body, 'Close', {
                duration: 40000,
                panelClass: ['mat-toolbar', 'mat-success']
              });

            }


            if (event.body == 'Logged In') {
              this.snack.open("User logged in successfully", 'Close', {
                duration: 4000,
                panelClass: ['mat-toolbar', 'mat-warn']
              });

            }

            if (event.body == 'logged out') {
              this.snack.open("logged out", 'Close', {
                duration: 4000,
                panelClass: ['mat-toolbar', 'mat-warn']
              });

            }

          }
        }, error => {
          // http response Text
          let errorText = error.statusText;
          let flag = '';

          console.log(error.statusText);

          // show error snackbar with red background
          if (error.statusText == "OK" && req.url.indexOf('dashboard')!=-1) {
          this.snack.open("Something went wrong! Try Again ", "", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
        
          if (errorText == "Conflict") {
            flag = 'on';
            this.snack.open("User already exists with this UserName\nPlease provide another UserName", 'X', {
              duration: 4000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
          if (errorText == "Unauthorized" && req.url.indexOf('home')!=-1) {
            flag = 'on';
            this.snack.open("Please provide valid UserName/Password", "X", {
              duration: 4000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }

       




        })
      )
  }
}
