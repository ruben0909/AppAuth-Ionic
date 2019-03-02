import { SafariViewController, SafariViewControllerOptions } from '@ionic-native/safari-view-controller';
import { Injectable } from '@angular/core';
import { InAppBrowserObject, InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';

@Injectable()
export class IonicAppBrowserProvider {

  private inAppLogin: InAppBrowserObject;

    constructor(private inAppBrowser: InAppBrowser, private safariViewController: SafariViewController,private  platform:Platform){ }

    public async ShowWindow(url: string): Promise<any>{
      
        if (this.platform.is('ios') && await this.safariViewController.isAvailable()) {

            let optionSafari: SafariViewControllerOptions = {
                url: url,
                enterReaderModeIfAvailable: true,               
            }
            await this.safariViewController.show(optionSafari).toPromise();

        }else{
            let options: InAppBrowserOptions = {
                location: 'no',
                zoom: 'no',
                clearcache: 'yes',
                clearsessioncache: 'yes'
            }

            this.inAppLogin = this.inAppBrowser.create(url, '_self', options);

            await this.inAppLogin.show();
        }
    }

    public async CloseWindow(){
        if(this.platform.is('ios') && await this.safariViewController.isAvailable()){
            this.safariViewController.hide();             
        }  else if(this.inAppBrowser["close"] !== undefined){
            this.inAppLogin.close(); 
        }
    }

}
