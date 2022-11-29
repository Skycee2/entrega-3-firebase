import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { rejects } from 'assert';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

declare var google;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //Variables para recibir el dato que se quiere mostrar en la página perfil
  /* rut: string;
  usuario: any;
  usuarios:any[]=[];
 
  //Variable para trabajar el storage
  KEY_USUARIOS = 'usuarios'; */

  usuario: Usuario;

  mapa: any;

  distancia: number;

  geoPointUbicacion: { lat: any; lng: any };


  constructor(private database: FirebaseService, private activatedRoute: ActivatedRoute, private alertController: AlertController/*  private usuarioService: UsuarioService */) { }

  
  async ngOnInit() {
    this.getUsuario();
  }
  async ionViewWillEnter() {
    this.getUsuario();
  }

  async getUsuario() {
    await this.database.getAuthUser().then((res) => {
      this.database.getDocumento<Usuario>('usuarios', res.uid).subscribe((res) => {
        this.usuario = res;
      })
    })
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cerraste sesión',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }





  /*   mapInit(lat_ = 0, lon_ = 0, map) {
      this.mapa = new google.maps.Map(map, {
        center: { lat: lat_, lng: lon_ },
        zoom: 18,
      });
    } */

  /*   cargarMarcador(lat_ = 0, lon_ = 0) {
      new google.maps.Marker({
        position: { lat: lat_, lng: lon_ },
        map: this.mapa,
      });
    }
    miUbicacion() {
      this.getUbicacionActual().then((res) => {
        var mapGeo: HTMLElement = document.getElementById('mapGeo');
  
        this.mapInit(res.coords.latitude, res.coords.longitude, mapGeo);
        this.cargarMarcador(res.coords.latitude, res.coords.longitude);
      });
    }
  
    getUbicacionActual(): Promise<any> {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    } */


  /* async ngOnInit () {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    this.usuario = await this.usuarioService.getUsuario(this.KEY_USUARIOS, this.rut);
    console.table(this.usuario);
    
  } */

}

