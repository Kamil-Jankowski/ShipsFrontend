import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { PlayerService } from '../player.service';
import { Player } from '../player';
import { GameService } from '../game.service';
import { RandomShipPlacementService } from '../random-ship-placement.service';

/**
 * Represents welcome view of the app
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private players: Player[];
  error_message:string;

  /**
   * Injecting player service for communication purpose
   * @param playerService - player communication service to be used
   * @param router - router to be used
   */
  constructor(private playerService: PlayerService,
    private randomShipPlacementService : RandomShipPlacementService,
    private gameService : GameService,
    private router: Router) { }

  
  /**
   * Calls for getPlayers() method on component initialization
   */
  ngOnInit() {
    this.getPlayers();
    this.error_message = ""; 
    }

  /**
   * Adds new player to the list and sends the player to the server
   * @param name - player name
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playerService.addPlayer(name)
      .subscribe(
        any => {
          this.error_message = '';
          this.randomShipPlacementService.createNewSetOfMapsForGivenPlayer(name).subscribe(
          any =>{this.router.navigate(['/waiting-room/' + name])})  
        }, 
        error => { 
          console.log(error); 
          this.error_message = error;}
      );
  }

  delete(): void {
    this.playerService.deleteAllPlayers().subscribe();
    this.gameService.deleteAllPlayers().subscribe();
  }

  /**
   * Gets players list from the server;
   * Can be used to redirect to landing page if list already contains two players
   */
  private getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }
}
