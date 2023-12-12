import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {


  private http = inject(HttpClient);

    // Para Tarea t40
  private readonly url = 'https://rickandmortyapi.com/api/character/';

  // Para Tarea t42
  private readonly urlLocal = 'http://localhost:3000/characters';

   private readonly urlRW = 'https://dmb-tsys-jsonserver-1212-ta42-production.up.railway.app/characters';

  characters = new BehaviorSubject(signal<any[]>([])) ;

  character = new BehaviorSubject([])


  // Para Tarea t40
  getCharacter(): Observable<any> {
     return this.http.get<any>(this.url + `?page=${this.getRandomNumber()}`).pipe(catchError(this.handleError));
    }

    // Para Tarea t42
  getCharacterLocal(): Observable<any> {
    return this.http.get<any>(this.urlRW).pipe(catchError(this.handleError));
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

  // Para Tarea t40-41
  getRandomNumber() {
    return Math.floor(Math.random() * 42) + 1;
  }

  // Para Tarea t42
  deleteCharacter(id: number) {
    return this.http.delete<any>(this.urlRW + `/${id}`);
  }

  // Para Tarea t42
  addCharacter(character: Character) : Observable<Character> {
    return this.http.post<Character>(this.urlRW, character);
  }

  editCharacterLocal(id: number, character: Character) : Observable<Character> {
    return this.http.put<Character>(this.urlRW + `/${id}`, character);
  }

}
