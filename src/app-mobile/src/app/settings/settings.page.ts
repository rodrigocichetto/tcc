import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { UserService } from '../services/user.service';
import { PAGES } from '../app.constants';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

  user: User;

  constructor(
    private nav: NavController,
    private userService: UserService,
  ) { }

  logout() {
    this.nav.navigateForward(PAGES.LOGIN);
  }

  ngOnInit() {
    this.userService.getMe().subscribe((user: any) => {
      this.user = user;
    });
  }

}
