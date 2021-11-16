import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MergedRouterStateSerializer, routerStateConfig } from './store/reducers/router.reducers';
import { routerReducer, RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'container-thing',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    StoreModule.forFeature(routerStateConfig.stateKey, routerReducer),
    StoreRouterConnectingModule.forRoot(routerStateConfig),
  ],
  providers:[{
      provide: RouterStateSerializer,
      useClass: MergedRouterStateSerializer,
    }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
