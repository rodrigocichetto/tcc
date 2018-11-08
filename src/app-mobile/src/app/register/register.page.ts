import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

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
  searchCity: string;

  private loading;

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private translate: TranslateService,
    private nav: NavController,
    private loadingController: LoadingController,
  ) { }

  register(form: NgForm) {
    if (form.valid) {

      this.loadingController.create()
        .then(loading => {
          loading.present();

          this.userService.register(this.user).subscribe(response => {

            this.translate.get(['SUCCESS', 'USER_REGISTERED_MSG', 'OK']).subscribe((translated: any) => {

              loading.dismiss();

              this.alertController.create({
                header: translated.SUCCESS,
                message: translated.USER_REGISTERED_MSG,
                buttons: [{
                  text: translated.OK,
                  cssClass: 'color--dark',
                  handler: () => {
                    this.nav.navigateBack(PAGES.LOGIN);
                  }
                }]
              }).then(alert => alert.present());

            });

          }, error => {

            loading.dismiss();

            this.translate.get(['ERROR', 'USER_REGISTERED_ERR', 'OK']).subscribe((translated: any) => {

              this.alertController.create({
                header: translated.ERROR,
                message: translated.USER_REGISTERED_ERR,
                buttons: [{
                  text: translated.OK,
                  cssClass: 'color--dark'
                }]
              }).then(alert => alert.present());

            });
          }, () => {
            loading.dismiss();
          });

        });

    }
  }

  searchCityNumber() {
  }

  ngOnInit() {
  }

}
