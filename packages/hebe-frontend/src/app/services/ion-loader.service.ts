import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class IonLoaderService {
  constructor(public loadingController: LoadingController) {}

  // Simple loader
  async showLoading() {
    await this.loadingController
      .create({
        spinner:"bubbles",
        message: 'Loading...',
        cssClass: 'custom-loading',
      })
      .then((res) => {
        res.present();
      });
  }
  async hideLoading() {
    await this.loadingController.dismiss().catch(console.error);
  }
}
