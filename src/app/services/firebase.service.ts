import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FireAuth } from '../interfaces/models';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  loading: any;
  constructor(private database: AngularFirestore, private auth: AngularFireAuth) {}


  createDocumento(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  createSubCollDoc(data: any, path: string,subPath, id: string,idClase: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).collection(subPath).doc(idClase).set(data);
  }

  prueba( path: string,subPath, id: string,idClase: string) {
    const collection = this.database.collection(path);
    const clase = collection.doc(id).collection(subPath).doc(idClase);
    return clase.valueChanges()
  }
  
  getDocumento<tipo>(path: string, id: string) {
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }
  
  getSubCollDoc<tipo>(path: string,subPath:string, id: string,idClase: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).collection<tipo>(subPath).doc(idClase).valueChanges();
  }

  getSubCollDocOnce<tipo>(path: string,subPath:string, id: string,idClase: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).collection<tipo>(subPath).doc(idClase).get();
  }


  getAsignaturaUsuario<tipo>(id: string, tipoUser: string) {
    const secciones = this.database.collection<tipo>('secciones', (ref) => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
        if (tipoUser === 'profesor') {
          query = query.where('profesor', '==', id);
        } else {
          query = query.where('alumno', 'array-contains', id);
        }
        return query;
      }).valueChanges();
      return secciones;
  }

  eliminarDocumento(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  getId() {
    return this.database.createId();
  }

  getCollection<tipo>(path: string) {
    return this.database.collection<tipo>(path).valueChanges();
  }
  
  getSubCollection<tipo>(path: string,subPath:string, id:string) {
    const collection = this.database.collection(path);
    return collection.doc(id).collection<tipo>(subPath).valueChanges();
  }

  agregarAlumnoAsignatura(id: string, alumno: string) {
    this.database
      .collection('secciones')
      .doc(id)
      .update({
        alumno: firebase.firestore.FieldValue.arrayUnion(alumno),
      });
  }
  
  eliminarAlumnoAsignatura(id: string, alumno: string) {
    this.database
      .collection('secciones')
      .doc(id)
      .update({
        alumno: firebase.firestore.FieldValue.arrayRemove(alumno),
      });
  }

  async login(correo, contrase??a) {
    const { user } = await this.auth.signInWithEmailAndPassword(correo, contrase??a);
    return user;
  }

  async logout() {
    await this.auth.signOut();
  }

  async verificacion() {
    return (await this.auth.currentUser).sendEmailVerification();
  }

  async registrar(correo, contrase??a) {
    const { user } = await this.auth.createUserWithEmailAndPassword(
      correo,
      contrase??a
    );
    await this.verificacion();
    return user;
  }

  async getAuthUser() {
    const aux: FireAuth = await this.auth.currentUser;
    return aux;
  }

  //crud administrador
  agregarAsig(coleccion, value){
    try {
      this.database.collection(coleccion).add(value);
      //this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error)
    }
  }

  getDatos(coleccion){
    try {
      return this.database.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  eliminar(coleccion, id){
    try {
      this.database.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion, id){
    try {
      return this.database.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  modificar(coleccion, id, value){
    try {
      this.database.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
    }
  }

///
  getUsuarioTipo<tipo>(tipoUsuario: string) {
    const usuarios = this.database.collection<tipo>('usuarios', (ref) => {
        let query:
          | firebase.firestore.CollectionReference
          | firebase.firestore.Query = ref;
          query = query.where('tipo', '==', tipoUsuario);
        return query;
      }).valueChanges();
      return usuarios;
  }

  ////////////////////////////////////////

  async cambiarClave(correo:string){
    const aux = await this.auth.sendPasswordResetEmail(correo);
    return aux
  }
    



  
  
}
