import { Component, OnInit } from '@angular/core';
import { NotificationMessage, NotificationType } from '../notification.message';
import { NotificationService } from '../notification.service';

/**
 * Represents landing page to be shown when no more players can be added to the game
 */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  winNotification: NotificationMessage;
  looseNotification: NotificationMessage;

  constructor(private notificationService: NotificationService) {
    this.winNotification = {
      message: 'Game over - you\'ve won!',
      type: NotificationType.warning}

    this.looseNotification = {
      message: 'Game over - you\'ve lost',
      type: NotificationType.warning}
   }

  ngOnInit(): void {
    this.showMessage(this.winNotification);
    this.showMessage(this.looseNotification);
  }

  /**
   * Displays toast notifications
   */
  showMessage(message: NotificationMessage) {
    this.notificationService.sendMessage(message);
  }

}
