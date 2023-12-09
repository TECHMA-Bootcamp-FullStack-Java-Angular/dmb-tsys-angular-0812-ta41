import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private http = inject(HttpClient);

  private readonly url = 'https://rickandmortyapi.com/api/character';

  characters = new BehaviorSubject(signal<any[]>([])) ;

  character = new BehaviorSubject([])



    getCharacter(): Observable<any> {
      const url = `${this.url}/`;
      return  this.http.get<any>(url+`?page=${this.getRandomNumber()}`).pipe(catchError(this.handleError));
  }



  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return 'Something bad happened; please try again later.';
  }


  getRandomNumber() {
    return Math.floor(Math.random() * 42) + 1;
  }




}
