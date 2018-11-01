import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { IrrigationService } from '../services/irrigation.service';
import { UserService } from '../services/user.service';
import { Irrigation } from '../interfaces/irrigation';
import { PAGES } from '../app.constants';

@Component({
  selector: 'app-irrigation',
  templateUrl: './irrigation.page.html',
  styleUrls: ['./irrigation.page.scss'],
})
export class IrrigationPage implements OnInit {

  i: Irrigation;

  constructor(
    private irrigationService: IrrigationService,
    private userService: UserService,
    private nav: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private translate: TranslateService,
  ) { }

  updateStatus() {
    this.loadingController.create()
      .then(loading => {

        loading.present();

        this.i.status = !this.i.status;
        this.irrigationService.update(this.i).subscribe((data) => {

          loading.dismiss();

          this.translate.get(['SUCCESS', 'STATUS_UPDATED', 'OK']).subscribe(translated => {

            this.alertController.create({
              header: translated.SUCCESS,
              message: translated.STATUS_UPDATED,
              buttons: [{
                text: translated.OK,
                cssClass: 'color--dark'
              }]
            }).then(alert => alert.present());

          });

        }, error => {

          loading.dismiss();
          this.i.status = !this.i.status;

          this.translate.get(['ERROR', 'STATUS_ERR_UPDATE', 'OK']).subscribe(translated => {

            this.alertController.create({
              header: translated.ERROR,
              message: translated.STATUS_ERR_UPDATE,
              buttons: [{
                text: translated.OK,
                cssClass: 'color--dark'
              }]
            }).then(alert => alert.present());

          });

        });

      });
  }

  ionViewWillEnter() {
    if (!this.userService.getToken().length) {
      this.userService.setToken('');
      this.nav.navigateRoot(PAGES.LOGIN);
    }
  }

  ngOnInit() {
    this.i = this.irrigationService.getSelected();
  }

}
