export interface Asignatura{
    id_asig: string;
    sigla_asig:string;
    nom_asig: string;
    profe_asig:string;
    alumno : [];
}

export interface Clase{
    id: string;
    alumnos : [];
    fecha: string;
    numero: number;
}

/* export interface SeccionHome {
    id: string;
    alumno : any;
    codigo:string;
    nombre: string;
    profesor: {
        id:string,
        nombre: string,
    };
    num_alumnos: number;
    sigla:string;
} */

export interface AlumnoDetalle {
    id: string;
    nom_completo: string;
    rut: string;
  };





  export interface AlumnoClase {
    asistencia:string
    id_Alumno:string,
    nombre:string,
    rut:string
    
  };

export interface Usuario {
    id:string;
    rut: string;
    nom_completo:string;
    correo: string;
    semestre:number;
    fecha_nac:string;
    tipo: string;

}
export interface FireAuth {
    uid:string;
    email:string;
    displayName:string;
    emailVerified:boolean;


}

