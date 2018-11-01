import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  ) { }

  openIrrigation(irrigation: Irrigation) {
    this.irrigationService.setSelected(irrigation);
    this.nav.navigateForward(PAGES.IRRIGATION);
  }

  ngOnInit() {
    this.irrigationService.getAll().subscribe((data: any) => {
      this.irrigations = data;
    });
    this.userService.getMe().subscribe((data: any) => {
      this.user = data;
    });
  }

}
