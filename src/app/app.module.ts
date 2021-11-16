import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ContainerModule } from './pages/container-module/container.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    ContainerModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
    metaReducers,
       }),
   !environment.production
   ? StoreDevtoolsModule.instrument({
       maxAge: environment.production ? 0 : 50, // Retains last 15 states, reduced to keep memory free
      logOnly: !!environment.production, // Restrict extension to log-only mode
   })
  : [],],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
