import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


import { Observable, throwError } from 'rxjs';

import { Player } from './player';

/**
* Service provides communication with backend for players requests.
* @Injectable - allowing for it to be injected as constructor parameter
*/
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersUrl = 'https://ships-room-service-backend.herokuapp.com/room';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Using injection of http client
   * @param http - http clientrequired for communication
   */
  constructor(private http: HttpClient) { }

  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** POST: add a new player to the server */
  addPlayer(name: string): Observable<Player> {
    let url: string = `${this.playersUrl}/${name}`;
    return this.http.post<Player>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete the player from the server */
  deletePlayer(player: Player | string): Observable<Player> {
    const name: string = typeof player === 'string' ? player : player.name;
    const url = `${this.playersUrl}/${name}`;
    return this.http.delete<Player>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /** DELETE: delete all the players from the server */
  deleteAllPlayers(): Observable<void> {
    const url = `${this.playersUrl}`;
    return this.http.delete<void>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error);
  }
}
