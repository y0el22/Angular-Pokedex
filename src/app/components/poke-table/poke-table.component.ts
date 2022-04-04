import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {

  displayedColumns: String[] = ['position', 'image', 'name', 'height'];
  data:any[]=[];
  dataSource=new MatTableDataSource<any>(this.data);
  pokemons = [];


  @ViewChild(MatPaginator, { static: true }) paginator:MatPaginator;



  constructor(private pokeService:PokemonService, private router:Router) { }

  ngOnInit(): void {

    this.getPokemons();

  }

  getPokemons(){

    let pokemonData;

    for(let i=1; i<=150; i++){

      this.pokeService.getPokemons(i).subscribe({
        next: (v) =>{ 
          pokemonData={
            position: i,
            image: v.sprites.front_default,
            name: v.name,
            height: v.height
          };
          this.data.push(pokemonData);
          this.dataSource= new MatTableDataSource<any>(this.data)
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    })
    }


    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRow(row){

    this.router.navigateByUrl(`pokedetail/${row.position}`);


  }



}
