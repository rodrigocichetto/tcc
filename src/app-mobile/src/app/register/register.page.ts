import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController } from '@ionic/angular';

import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { PAGES } from '../app.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    name: '',
    username: '',
    password: '',
    mail: '',
    city: 0
  };
  fieldInvalid = {
    value: '',
    msg: ''
  };
  searchCity: string;

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private translate: TranslateService,
    private nav: NavController,
  ) { }

  async register(form: NgForm) {
    if (form.valid) {
      try {
        const response = await this.userService.register(this.user);

        const translated: any = await this.translate.get(['SUCCESS', 'USER_REGISTERED_MSG', 'OK']);

        const alert = await this.alertController.create({
          header: translated.value.SUCCESS,
          message: translated.value.USER_REGISTERED_MSG,
          buttons: [{
            text: translated.value.OK,
            cssClass: 'color--dark',
            handler: () => {
              this.nav.navigateBack(PAGES.LOGIN);
            }
          }]
        });

        alert.present();
      } catch (e) {

        const translated: any = await this.translate.get(['ERROR', 'USER_REGISTERED_ERR', 'OK']);

        const alert = await this.alertController.create({
          header: translated.value.SUCCESS,
          message: translated.value.USER_REGISTERED_MSG,
          buttons: [{
            text: translated.value.OK,
            cssClass: 'color--dark'
          }]
        });

        alert.present();

      }
    }
  }

  searchCityNumber() {
  }

  ngOnInit() {
  }

}
