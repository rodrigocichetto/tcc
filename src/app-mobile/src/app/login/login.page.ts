import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController } from '@ionic/angular';

import { UserOptions } from '../interfaces/user-options';
import { PAGES } from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: UserOptions = {
    username: '',
    password: ''
  };

  constructor(
    private alertController: AlertController,
    private translate: TranslateService,
    private nav: NavController
  ) { }

  login(form: NgForm) {
    if (form.valid) {
      console.info('valid', this.user);
    } else {
      this.presentAlert('ERROR', 'LOGIN_INVALID', 'OK');
    }
  }

  openRegisterPage() {
    this.nav.navigateForward(PAGES.REGISTER);
  }

  private async presentAlert(headerMsg: string, contentMsg: string, buttonTxt: string) {
    const translated: any = await this.translate.get([headerMsg, contentMsg, buttonTxt]);
    
    const alert = await this.alertController.create({
      header: translated.value.ERROR,
      message: translated.value.LOGIN_INVALID,
      buttons: [{
        text: translated.value.OK,
        cssClass: 'color--dark'
      }]
    });

    alert.present();
  }

  ngOnInit() {
  }

}
