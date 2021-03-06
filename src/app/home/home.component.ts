import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from '../player.service';
import { TranslateService } from '@ngx-translate/core';
import { StatusWithToken } from '../status-with-token';

/**
 * Represents welcome view of the app
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  errorMessage:string;

  /**
   * Injecting player service for communication purpose
   * @param playerService - player communication service to be used
   * @param router - router to be used
   */
  constructor(private playerService: PlayerService,
    private translate: TranslateService,
    private router: Router) { }
  
  /**
   * Calls for getPlayers() method on component initialization
   */
  ngOnInit() {
    this.errorMessage = ""; 
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
        (response: StatusWithToken) => {
          localStorage.setItem('roomId', response.roomId);
          localStorage.setItem('token', response.token);
          this.errorMessage = '';
          this.router.navigate(['/waiting-room/' + name])
        },
        error => { 
          console.log(error); 
          if (error === 'ROOM_IS_FULL') {
            this.assignErrorMessage('HOME.FULL');
          } else if (error === 'NICKNAME_DUPLICATION') {
            this.assignErrorMessage('HOME.NICKNAME_DUPLICATION');
          } else if (error === 'DUPLICATED_SESSION') {
            this.assignErrorMessage('HOME.DUPLICATED_SESSION');
          } else {
            this.assignErrorMessage('HOME.ERROR');
          }
        }
      );
  }

  private assignErrorMessage(error: string) {
    this.translate
        .get(error)
        .subscribe((error: string) => this.errorMessage = error);
  }
}
