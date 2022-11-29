import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    
    children:[

      {
        path: '',
        redirectTo:'/tabs',
        pathMatch:'full'
      },
      {
        path: 'administrador',
        loadChildren: () => import('../administrador/administrador.module').then(m => m.AdministradorPageModule)
      },
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'admin-clases',
        loadChildren: () => import('../admin-clases/admin-clases.module').then( m => m.AdminClasesPageModule)
      },
      {
        path: 'docente',
        loadChildren: () => import('../docente/docente.module').then( m => m.DocentePageModule)
      },
      {
        path: 'alumno',
        loadChildren: () => import('../alumno/alumno.module').then( m => m.AlumnoPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
        /* canActivate: [AuthGuard] */
      },
      {
        path: 'apianime',
        loadChildren: () => import('../apianime/apianime.module').then( m => m.ApianimePageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}