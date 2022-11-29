import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
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

  constructor(private activatedRoute: ActivatedRoute,private alertController: AlertController /* private usuarioService: UsuarioService */) { }


  ngOnInit() {
    
  }
  /* async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.usuarioService.getUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario)
  } */

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cerraste sesión',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
