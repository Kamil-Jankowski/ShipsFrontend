import { Component, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { PlayerService } from '../player.service';
import { Player } from '../player';
import { TranslateService } from '@ngx-translate/core';
import { GameService } from '../game.service';

/**
 * Represents waiting room view, on which we can see players' names.
 */
@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {

  private MAX_NUMBER_OF_PLAYERS_IN_ROOM: number = 2;
  private subscription: Subscription;
  private sessionPlayer: Player;
  private wasCreateNewSetOfMapsForGivenPlayerCalled: boolean;
  playersInRoom: Player[];

  /**
   * Injecting player service for communication purpose and initializing empty players list.
   * @param playerService - player communication service to be used
   */
  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public translate: TranslateService) {
    this.playersInRoom = [];
    this.sessionPlayer = { name: this.activatedRoute.snapshot.paramMap.get('name') } as Player;
    this.wasCreateNewSetOfMapsForGivenPlayerCalled = false;
  }

  /**
   * Calls for getPlayers() method on component initialization and assigns players to the room
   */
  ngOnInit() {
    this.subscription = timer(0, 2000).pipe(switchMap(() => this.playerService.getPlayers(localStorage.getItem("roomId"))))
      .subscribe(playersInRoom => {
        this.assignPlayersInRoom(playersInRoom);
      });
  }

  /**
   * Removes subscription.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private assignPlayersInRoom(playersInRoom: Player[]) {
    this.playersInRoom = playersInRoom;
    if (0 == playersInRoom.length) {
      this.router.navigate(['/home']);
    }
    if (this.MAX_NUMBER_OF_PLAYERS_IN_ROOM == playersInRoom.length && !this.wasCreateNewSetOfMapsForGivenPlayerCalled) {
      this.wasCreateNewSetOfMapsForGivenPlayerCalled = true;
      localStorage.setItem('players', JSON.stringify(playersInRoom));
      this.gameService.createNewSetOfMapsForGivenPlayer(this.sessionPlayer.name).subscribe(() => {
        this.router.navigate(['/game/' + this.sessionPlayer.name]);
      });
    }
  }
}
