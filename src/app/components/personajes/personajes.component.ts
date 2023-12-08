import { Component, OnInit, signal } from '@angular/core';
import { PersonajesService } from '../../services/personajes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [],
  templateUrl: './personajes.component.html',
  styleUrl: './personajes.component.css'
})
export class PersonajesComponent  implements OnInit {

  characters = signal<any[]>([]);

  constructor(private personajesService: PersonajesService, private router: Router ) {}


  ngOnInit() {
    this.getPersonaje();
  }

  seeMore(id: any, character: any) {
    this.personajesService.character = this.characters().find((elem: any) => elem.id == id)
    this.router.navigate(['/detalles', character.id]);
  }

  getPersonaje() {
    this.personajesService.getCharacter().subscribe({

      next: result => {
        if (result.results && Array.isArray(result.results)) {
          this.characters.set(result.results)
        } else {
          console.error('API response is not as expected:', result);
        }
      },

      error: e => {
        console.error('Error fetching characters:', e);
      }
    });
  }


}
