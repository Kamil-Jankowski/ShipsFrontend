import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


import { Observable, throwError } from 'rxjs';
<<<<<<< HEAD
  
=======

>>>>>>> Added sending reset backend data and delete all players on game component destroy
import { ShootMapCellStatus } from './shoot-map-cell-status';
import { ShootResponse } from './shoot-response';
import { ShipMapCellStatus } from './ship-map-cell-status';
import { CurrentGameStatus } from './current-game-status';

/**
* Service provides communication with GameService.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameUrl = 'https://ships-game-service-backend.herokuapp.com/maps';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Using injection of http client
   * @param http - http clientrequired for communication
   */
  constructor(private http: HttpClient) { }

  getShipMap(name: string): Observable<Map<number, ShipMapCellStatus>> {
    let url: string = `${this.gameUrl}/shipmap/${name}`
    return this.http.get<Map<number, ShipMapCellStatus>>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getShootMap(name: string): Observable<Map<number, ShootMapCellStatus>> {
    let url: string = `${this.gameUrl}/shootmap/${name}`
    return this.http.get<Map<number, ShootMapCellStatus>>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  shootPlayer(sourceName: string, targetName: string, cellIndex: number): Observable<ShootResponse> {
    let url: string = `${this.gameUrl}/${sourceName}-vs-${targetName}/${cellIndex}`;
    return this.http.post<ShootResponse>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  deleteAllPlayers(): void {
    this.http.delete(this.gameUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

<<<<<<< HEAD
  getCurrentGameStatus() : Observable<CurrentGameStatus>{
    let url : string = `${this.gameUrl}/gamestatus`;
    return this.http.get<CurrentGameStatus>(url, this.httpOptions) 
    .pipe(catchError(this.handleError));
  }


  deleteAllPlayers() : void {
    this.http.delete(this.gameUrl, this.httpOptions) 
    .pipe(catchError(this.handleError));
=======
  resetBackendData(playerName: string): void {
    let url: string = `${this.gameUrl}/${playerName}`
    this.http.delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
>>>>>>> Added sending reset backend data and delete all players on game component destroy
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
