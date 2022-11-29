import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';

import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  rut: string;
  usuario: any;

  //Variable para trabajar el storage
  KEY_USUARIOS = 'usuarios';

  constructor(private router: Router,private database: FirebaseService ,private activatedRoute: ActivatedRoute,private alertController: AlertController /* private usuarioService: UsuarioService */) { }


  ngOnInit() {
    
  }
  /* async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.usuarioService.getUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario)
  } */

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
