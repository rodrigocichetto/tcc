import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { UserOptions } from '../interfaces/user-options';

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
    private translate: TranslateService
  ) { }

  login(form: NgForm) {
    if (form.valid) {
      console.info('valid', this.user);
    } else {
      this.presentAlert();
    }
  }

  private async presentAlert() {
    const translated: any = await this.translate.get(['ERROR', 'LOGIN_INVALID', 'OK']);
    
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
