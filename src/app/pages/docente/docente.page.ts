import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4  } from 'uuid';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {
   //Variables que reciben los datos de ingreso
   /* rut: string;
   usuario: any; */
 
   //Variables para trabajar el storage
   /* KEY_USUARIOS = 'usuarios'; */
 
   //Variables para el cod. qr
   elementType = 'canvas';
   value = '';

    
  constructor(private activatedRoute: ActivatedRoute,private alertController: AlertController/*  private usuarioService: UsuarioService */) { }

  ngOnInit() {

    /* this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = this.usuarioService.getUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario) */
  }

  generarQR(){
    if(this.value == ''){
      this.value = v4();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cerraste sesión',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

}








