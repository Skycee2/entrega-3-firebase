import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apianime',
  templateUrl: './apianime.page.html',
  styleUrls: ['./apianime.page.scss'],
})
export class ApianimePage implements OnInit {

  //variables auxiliares para trabajar las peticiones:

  cant_personajes: number = 0;
  personajes : any[] = [];

  constructor(private router: Router,private database: FirebaseService,private apiService: ApiService,private alertController: AlertController) { }

  async ngOnInit() {
    await this.apiService.get();
     //llamar al metodo que obtiene a todos los personajes:
    let respuesta = await this.apiService.get();

    respuesta.subscribe( (data:any) => {
      console.log(data.info);

      this.cant_personajes = data.info.count;
      this.personajes = data.results;

    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Estas seguro de salir?',
      cssClass: '',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          role: 'cancel',
        },
        {
          text: 'Si',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.logout()  ;
          },
        }
      ],
    });

    await alert.present();

  }

  logout(){
    this.database.logout();
    this.router.navigateByUrl('/login')
  }

}
