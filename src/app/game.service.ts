import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';

import { ShootMapCellStatus } from './shoot-map-cell-status.enum';
import { ShipMapCellStatus } from './ship-map-cell-status.enum';
import { ShootResponse } from './shoot-response';
import { CurrentGameStatus } from './current-game-status';

/**
* Service provides communication with GameService.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'http://localhost:9090/maps';

  /**
   * Using injection of http client
   * @param http - http clientrequired for communication
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets ship map from GameService.
   * @param name - name of the player, whose ship map is get
   * @returns the Observable of Map of numbers and ShipMapCellStatus
  */

  getShipMap(name: string) : Observable<Map<number, ShipMapCellStatus>>{
    let url : string = `${this.gameUrl}/shipmap/${localStorage.getItem("roomId")}/${name}`
    return this.http.get<Map<number, ShipMapCellStatus>>(url).pipe(catchError(this.handleError));
  }

  /**
   * Gets shoot map from GameService.
   * @param name - name of the player, whose shoot map is get
   * @returns the Observable of Map of numbers and ShootMapCellStatus
   */
  getShootMap(name: string) : Observable<Map<number, ShootMapCellStatus>>{
    let url : string = `${this.gameUrl}/shootmap/${localStorage.getItem("roomId")}/${name}`
    return this.http.get<Map<number, ShootMapCellStatus>>(url).pipe(catchError(this.handleError));
  }

  /**
   * Posts a new shoot.
   * @param sourceName - name of the player, who shoots
   * @param targetName - name of the player, who is shot
   * @param cellIndex - index of map that is shoot
   * @returns the ShootMapCellSrtatus of shot cell index and winner condition
   */
  shootPlayer(sourceName : string, cellIndex : number) : Observable<ShootMapCellStatus>{
    let url : string = `${this.gameUrl}/${localStorage.getItem("roomId")}/${sourceName}/${cellIndex}`;
    return this.http.post<ShootMapCellStatus>(url, {}).pipe(catchError(this.handleError));
  }


    /**
   * Sends the request to generate new set of maps for particular player.
   * @param name - name of the player
   */
  authenticate(name: string){
    let url : string = `${this.gameUrl}/authenticate/${localStorage.getItem("roomId")}/${name}`
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }
  
  /**
   * Sends the request to generate new set of maps for particular player.
   * @param name - name of the player
   */
  createNewSetOfMapsForGivenPlayer(name: string){
    let url : string = `${this.gameUrl}/${localStorage.getItem("roomId")}/${name}`
    return this.http.post(url, {}).pipe(catchError(this.handleError));
  }

  /**
   * Get current game status.
   * It is used for synchronization betweeen frontend and game service.
   * @returns name of the player whose turn is and looser condition.
   */
  getCurrentGameStatus() : Observable<CurrentGameStatus>{
    let url : string = `${this.gameUrl}/gamestatus/${localStorage.getItem("roomId")}`;
    return this.http.get<CurrentGameStatus>(url).pipe(catchError(this.handleError));
  }

  /**
   * Deletes all boards and players in GameService 
   */
  deleteAllPlayers() : Observable<any> {
    return this.http.delete(this.gameUrl).pipe(catchError(this.handleError));
  }

  //TODO: add typedoc
  deletePlayer(){
    return this.http.delete(this.gameUrl).pipe(catchError(this.handleError));
  }

  /**
   * Deletes a player in GameService 
   * @param name - name of the player to delete
   */
  resetBackendGameStatusAndIndicateLoser(name : string) : Observable<any> {
    let url: string = `${this.gameUrl}/${localStorage.getItem("roomId")}/${name}`;
    return this.http.delete(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
