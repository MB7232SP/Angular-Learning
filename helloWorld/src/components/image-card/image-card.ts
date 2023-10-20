import { Component, Input } from '@angular/core';
import {ActionSheetController, Platform, ToastController} from 'ionic-angular'
import { ApiService } from '../../services/api.service';
import { saveAs } from 'file-saver';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the ImageCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-image-card',
  templateUrl: 'image-card.html'
})
export class ImageCardComponent {

  @Input() Image : any;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public ApiCall:ApiService,
    public toastCtrl: ToastController,
    ) {
      AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => {
          if (result.hasPermission) {
            // You have the permission, you can access the storage.
            console.log('permission granted')
          } else {
            console.log('permission not granted')
            // Request the permission
            AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
          }
        },
        err => {
          console.log('somthing went wrong')
          console.error(err);
        }
      );
    
  }
  Download(url:string,name:string){ 
      this.ApiCall.presentLoading();
      this.ApiCall.getImage(url).subscribe((res: Blob)=>{
        this.saveImage(res,name);
        this.ApiCall.dismisLoading();
      })
  };

  saveImage(data: Blob,name:string) {
    const blob = new Blob([data], { type: 'image/jpeg' }); // Set the correct MIME type
    saveAs(blob, `${name}.jpg`);
    this.showToast('Image successfully downloaded.');
  }
  showToast(msg:string) {
    const toast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000,
    });
    toast.present();
  }
  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Download LQ',
          role: 'destructive',
          icon: 'md-download',
          handler: () => {
            this.Download(this.Image.src.medium,this.Image.alt);
          }
        },
        {
          text: 'Download HQ',
          icon: 'download',
          handler: () => {
            this.Download(this.Image.src.original,this.Image.alt);
          }
        },
        {
          text: 'Download Landscape',
          icon: 'download',
          handler: () => {
            this.Download(this.Image.src.landscape,this.Image.alt);
          }
        },
        {
          text: 'Download Portrait',
          icon: 'download',
          handler: () => {
            this.Download(this.Image.src.portrait,this.Image.alt);
          }
        },
        {
          text: 'Download Original',
          icon: 'download',
          handler: () => {
            this.Download(this.Image.src.original,this.Image.alt);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
