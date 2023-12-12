import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {


  private http = inject(HttpClient);

  private readonly url = 'https://rickandmortyapi.com/api/character/';
  private readonly urlLocal = 'http://localhost:3000/characters';

  characters = new BehaviorSubject(signal<any[]>([])) ;

  character = new BehaviorSubject([])



  getCharacter(): Observable<any> {
     return this.http.get<any>(this.url + `?page=${this.getRandomNumber()}`).pipe(catchError(this.handleError));
    }

  getCharacterLocal(): Observable<any> {
    return this.http.get<any>(this.urlLocal).pipe(catchError(this.handleError));
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


  deleteCharacter(id: number) {
    return this.http.delete<any>(this.urlLocal + `/${id}`);
  }

  addCharacter(character: Character) : Observable<Character> {
    return this.http.post<Character>(this.urlLocal, character);
  }

}
