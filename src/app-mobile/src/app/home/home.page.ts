import { Component, OnInit } from '@angular/core';
import { NavController, Events } from '@ionic/angular';

import { IrrigationService } from '../services/irrigation.service';
import { UserService } from '../services/user.service';
import { Irrigation } from '../interfaces/irrigation';
import { PAGES } from '../app.constants';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  irrigations: Array<Irrigation>;
  user: User;

  constructor(
    private irrigationService: IrrigationService,
    private userService: UserService,
    private nav: NavController,
    public events: Events
  ) {
    events.subscribe('add:irrigation', (data) => {
      this.irrigations.push(data);
    });
  }

  openIrrigation(irrigation: Irrigation) {
    this.irrigationService.setSelected(irrigation);
    this.nav.navigateForward(PAGES.IRRIGATION);
  }

  getIrrigations(event?) {
    this.irrigationService.getAll().subscribe((data: any) => {
      this.irrigations = data;
    }, (err) => { }
    , () => {
      if (event) {
        event.target.complete();
      }
    });
  }

  getUserInfo(event?) {
    this.userService.getMe().subscribe((data: any) => {
      this.user = data;
      if (event) {
        this.events.publish('refresh:weather', data);
      }
    }, (err) => { }
      , () => {
        if (event) {
          event.target.complete();
        }
      });
  }

  async doRefresh(event) {
    this.getIrrigations(event);
    this.getUserInfo(event);
  }

  ngOnInit() {
    this.getIrrigations();
    this.getUserInfo();
  }

}
