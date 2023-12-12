import { Component, inject } from '@angular/core';
import { FormControl, FormGroup , ReactiveFormsModule, Validators} from '@angular/forms';
import { PersonajesService } from '../../services/personajes.service';
import { Router } from '@angular/router';
import { Character } from '../../models/character';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [ ReactiveFormsModule  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.css'
})
export class FormAddComponent {

  // Añadido para la Tarea t42
  servCaharacter = inject(PersonajesService);
  router = inject(Router);

  characters: Character = {
    id: 0,
    name: '',
    status: '',
    species: '',
    origin: '',
    location: '',
    image: '',
    gender: ''
  };

  characterForm = new FormGroup({
    id: new FormControl(this.characters.id , Validators.required),
    name: new FormControl(this.characters.image, Validators.required),
    status: new FormControl(this.characters.status, Validators.required),
    species: new FormControl(this.characters.species, Validators.required),
    gender: new FormControl(this.characters.gender, Validators.required),
    origin: new FormControl(this.characters.origin, Validators.required),
    location: new FormControl(this.characters.location, Validators.required),
    image: new FormControl(this.characters.image, Validators.required),
  });

  addCharacter() {
    this.characters = this.characterForm.value as Character;
    this.servCaharacter.addCharacter(this.characters).subscribe((result: any) => {
      this.servCaharacter.characters.next(result);
      alert("Personaje agregado");
     });
  }

}
