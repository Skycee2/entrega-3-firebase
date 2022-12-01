import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController } from '@ionic/angular';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/models';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  edadMinima: number = 17;

  tipoUsuario: any[] = [{
    tipo_usu: 'alumno'
  },
  {
    tipo_usu: 'profesor'
  },
  {
    tipo_usu: 'administrador'
  }];

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{1,4}.[A-Za-z]{1,20}@duocuc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@duoc.cl|[A-Za-z]{1,4}.[A-Za-z]{1,20}@profesor.duoc.cl')]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1)]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    tipo_usuario: new FormControl('this.tipoUsuario', [])
  });


  verificar_password: string;
  //VAMOS A CREAR UNA VARIABLE PARA OBTENER LA LISTA DE USUARIOS DEL SERVICIO DE USUARIOS:
  usuarios: any[] = [];
  id_modificar: any = '';
  /* KEY_USUARIOS = 'usuarios'; */


  constructor( private validaciones: ValidacionesService,private router: Router,private database: FirebaseService,private alertController: AlertController,/* private usuarioService: UsuarioService */ private validacionesService: ValidacionesService, private loadingController: LoadingController) { }

  ngOnInit(){
    this.listar();
  }

  agregar(){
    this.database.agregarAsig('usuarios', this.usuario.value);
    this.usuario.reset();
  }

  listar(){
    this.database.getDatos('usuarios').subscribe(
      data => {
        this.usuarios = [];
        for(let usuario of data){
          console.log( usuario.payload.doc.data() );
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push( usu );
        }
      }
    );
  }


  eliminar(id){
    this.database.eliminar('usuarios', id);
  }

  buscar(id){
    this.database.getDato('usuarios', id).subscribe(
      (response: any) => {
        //console.log( response.data() );
        this.usuario.setValue( response.data() );
        this.id_modificar = response.id;
      }
    );
  }

  modificar(){
    let usu = this.usuario.value;
    this.database.modificar('usuarios', this.id_modificar, usu);
    this.usuario.reset();
    this.id_modificar = '';
  }

  //aler agregar
  async agregarAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }

  //alert modificar
  async modificarAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario Modificado',
      message: '',
      buttons: ['OK'],
    });

    await alert.present();
  }



/*    async eliminarAlert() {
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
            this.database.eliminar('usuarios' );
          },
        }
      ],
    }); 

    await alert.present();

  } */


  //alert cerrar sesión
  async logoutAlert() {
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

  /* async ngOnInit() {
    await this.cargarDatos();
  } */

  //Métodos para poder usar storage
  /* async cargarDatos() {
    this.usuarios = await this.usuarioService.getUsuarios(this.KEY_USUARIOS);
  }


  //método del formulario
  async registrar() {
    this.usuario.value.rut = '';
    //Verificar password
    if (this.usuario.controls.password.value != this.verificar_password) {
      alert('Contraseñas no coinciden!');
      return;
    }

    //Verificar rut
    if (!this.validacionesService.validarRut(this.usuario.controls.rut.value)) {
      alert('Rut inválido.')
      return;
    }

    //Verificar edad
    if (!this.validacionesService.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
      alert('Edad mínima 17 años.');
      return
    }

    //verificar registro
    var resp = await this.usuarioService.addUsuario(this.KEY_USUARIOS, this.usuarios);
    if (resp) {
      alert('Registrado')
      this.cargarDatos();
    }
    alert('Usuario registrado!');
    this.usuario.reset();
    this.verificar_password = '';
  } */

  /* async eliminar(rut) {
    await this.usuarioService.deleteUsuario(this.KEY_USUARIOS, rut);
    await this.cargandoPantalla('Eliminando,espere unos segundos')
    await this.cargarDatos();
  } */


  /* async buscar(rut) {
    this.usuarios = await this.usuarioService.getUsuario(this.KEY_USUARIOS, rut);
    /*this.usuarios.setValue(alumnoEncontrado);
    this.verificar_password = alumnoEncontrado.password;
  }*/
  

  /* async modificar() {
    await this.usuarioService.updateUsuario(this.KEY_USUARIOS, this.usuarios);
    //this.limpiar();
    this.cargarDatos();
  } */

  /* limpiar(){
    this.usuarios.reset();
    this.verificar_password = '';
  } */

  //cargando pantalla
  /* async cargandoPantalla(message) {
    const cargando = await this.loadingController.create({
      message,
      duration: 3000,
      spinner: 'lines-small'
    });

    cargando.present();
  } */

}
