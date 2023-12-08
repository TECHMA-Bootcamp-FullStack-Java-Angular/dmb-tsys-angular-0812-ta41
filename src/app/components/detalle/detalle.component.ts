import { Component, Inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from '../../services/personajes.service';
import {  UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [ UpperCasePipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

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

}
