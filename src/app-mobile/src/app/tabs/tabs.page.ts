import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { PAGES } from '../app.constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private userService: UserService,
    private nav: NavController,
  ) {}

  ionViewWillEnter() {
    this.validateLogin()
  }
  
  validateLogin() {
    if (!this.userService.getToken().length) {
      this.userService.setToken('');
      this.nav.navigateRoot(PAGES.LOGIN);
    }
  }
}
