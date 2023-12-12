import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import {  UpperCasePipe } from '@angular/common';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Character } from '../../models/character';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [ UpperCasePipe , ReactiveFormsModule ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

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


  form = new FormGroup({

    status: new FormControl(this.characters.status, Validators.required),
    species: new FormControl(this.characters.species, Validators.required),
    gender: new FormControl(this.characters.gender, Validators.required),
    origin: new FormControl(this.characters.origin, Validators.required),
    location: new FormControl(this.characters.location, Validators.required),

  })


  characterId!: number;
  character: any;
  data= signal<any[]>([])

  constructor(
    private route: ActivatedRoute,
    private persoanjesService : PersonajesService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.characterId = params['id'];
    });

    this.getDetalle()
    console.log(this.persoanjesService.character);
  }

  getDetalle() {
    this.character = this.persoanjesService.character
  }

  editPersonajeLocal() {
    this.character.status = this.form.value.status;
    this.character.species = this.form.value.species;
    this.character.gender = this.form.value.gender;
    this.character.origin = this.form.value.origin;

    this.persoanjesService.editCharacterLocal(this.character.id, this.character).subscribe((result: any) => {
      this.persoanjesService.characters.next(result);
      alert("Personaje editado");
    });
  }

}
