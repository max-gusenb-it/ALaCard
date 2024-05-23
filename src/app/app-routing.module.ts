import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ItNavigationComponent } from './shared/components/buttons/it-navigation/it-navigation.component';

export const routes: Routes = [
  {
    path: '',
    component: ItNavigationComponent,
    children: [
      {
        path: 'test',
        loadChildren: () => import('./features/test/test.module').then( m => m.TestPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
