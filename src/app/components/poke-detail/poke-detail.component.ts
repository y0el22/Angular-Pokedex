import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon: any = '';
  pokemonType = [];
  pokemonImg = "";
  pokemonWeight = "";

  constructor(private pokemonService:PokemonService, private activatedRouter:ActivatedRoute) { 

    this.activatedRouter.params.subscribe( 
      (params) => this.getPokemon(params['id'])
  );

  }


  getPokemon(id){
    this.pokemonService.getPokemons(id).subscribe(
      res=>{
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
        this.pokemonWeight= res.height;
      }
    )
    
  }

  ngOnInit(): void {
  }

}
