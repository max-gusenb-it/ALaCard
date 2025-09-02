import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { ItNavigationComponent } from './it-navigation/it-navigation.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ItNavigationComponent,
    children: [
      {
        path: 'test',
        loadChildren: () => import('@features').then(m => m.TestPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('@features').then(m => m.ProfilePageModule),
        canActivate: mapToCanActivate([AuthGuard])
      },
      {
        path: 'home',
        loadChildren: () => import('@features').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'room',
    loadChildren: () => import('@features').then( m => m.RoomPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
