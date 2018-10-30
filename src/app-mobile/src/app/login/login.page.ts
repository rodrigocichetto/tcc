import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { UserOptions } from '../interfaces/user-options';
import { UserService } from '../services/user.service';
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
    private nav: NavController,
    private userService: UserService,
    private loadingController: LoadingController,
    private nativeStorage: NativeStorage,
  ) { }

  async login(form: NgForm) {
    if (form.valid) {

      this.loadingController.create()
        .then(loading => {

          loading.present();

          this.userService.login(this.user).subscribe((response: any) => {

            loading.dismiss();
            this.userService.setToken(response.token);
            this.nav.navigateForward(PAGES.TABS);

          }, error => {

            loading.dismiss();

            this.translate.get(['ERROR', 'LOGIN_INVALID', 'OK']).subscribe(translated => {

              this.alertController.create({
                header: translated.ERROR,
                message: translated.LOGIN_INVALID,
                buttons: [{
                  text: translated.OK,
                  cssClass: 'color--dark'
                }]
              }).then(alert => alert.present());

            });

          });

        });

    } else {

      this.translate.get(['ERROR', 'LOGIN_NULL', 'OK']).subscribe(translated => {

        this.alertController.create({
          header: translated.ERROR,
          message: translated.LOGIN_INVALID,
          buttons: [{
            text: translated.OK,
            cssClass: 'color--dark'
          }]
        }).then(alert => alert.present());

      });

    }
  }

  openRegisterPage() {
    this.nav.navigateForward(PAGES.REGISTER);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user = {
      username: '',
      password: ''
    };
  }

}
