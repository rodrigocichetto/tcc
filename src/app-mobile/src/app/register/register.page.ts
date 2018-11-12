import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';

import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { PAGES } from '../app.constants';
import { InpeService } from '../services/inpe.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('citySelectable') citySelectable: IonicSelectableComponent;
  @ViewChild('loginForm') loginForm: NgForm;

  user: User = {
    name: '',
    username: '',
    password: '',
    mail: '',
    city: {
      id: null,
      nome: null,
      uf: null
    }
  };

  searchedCities;

  submitted: boolean = false;

  private loading;

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private inpeService: InpeService,
    private translate: TranslateService,
    private nav: NavController,
    private loadingController: LoadingController,
  ) { }

  cityChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.user.city = event.value;
  }

  searchCity(event: {
    component: IonicSelectableComponent,
    text: string
  }) {

    const text = (event.text || '').trim().toLowerCase();

    if (!text) {
      event.component.items = [];
      return;
    } else if (event.text.length < 1) {
      return;
    }

    event.component.startSearch();

    this.inpeService.searchCity(text).subscribe((data: any) => {
      this.searchedCities = data.cidade;
      event.component.items = data.cidade;
    }, err => {
      event.component.endSearch();
    },
      () => {
        event.component.endSearch();
      });
  }

  register() {
    this.submitted = true;
    
    if (this.loginForm.valid) {

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
