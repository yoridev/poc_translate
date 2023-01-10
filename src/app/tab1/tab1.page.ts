import { Component } from '@angular/core';

import { TranslateConfigService } from 'src/app/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  language;

  constructor(
    private translateConfigService: TranslateConfigService,
    public actionSheetController: ActionSheetController) {
    this.translateConfigService.getDefaultLanguage();
    this.language = this.translateConfigService.getCurrentLang();
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');
        }
      }, {
        text: 'Spanish',
        icon: 'language-outline',
        handler: () => {
          this.language = 'es';
          this.translateConfigService.setLanguage('es');
        }
      }, {
        text: 'Portuguese',
        icon: 'language-outline',
        handler: () => {
          this.language = 'pt';
          this.translateConfigService.setLanguage('pt');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

}
