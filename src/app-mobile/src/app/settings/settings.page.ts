import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { PAGES } from '../app.constants';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  constructor(
    private nav: NavController,
    private userService: UserService,
  ) { }

  logout() {
    this.nav.navigateForward(PAGES.LOGIN);
  }

}
